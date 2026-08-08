export function AngularCheatSheet() {
    return (
        <div className="space-y-8">
            {/* 1. CLI & WORKSPACE */}
            <section>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">1. Angular CLI & Workspace Setup</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">Commands for project initialization, build configurations, and schematics.</p>
                <div className="mt-6 space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">CLI Commands</h3>
                        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                            {`npm install -g @angular/cli            # Install CLI globally
ng new my-app --ssr --style=scss      # Create app with SSR and SCSS
ng serve --open --port 4200            # Run dev server
ng build --configuration production    # Production bundle output to dist/
ng test                                # Execute unit tests
ng e2e                                 # Execute end-to-end tests
ng update @angular/cli @angular/core   # Automated workspace migration`}
                        </pre>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Schematics Generators</h3>
                        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                            {`ng g c features/user --standalone     # Standalone Component
ng g s services/auth                   # Injectable Service
ng g p shared/pipes/truncate           # Custom Pipe
ng g d shared/directives/highlight       # Custom Directive
ng g g guards/auth                     # Functional Guard (CanActivate, CanMatch)
ng g interceptor core/auth             # Functional HTTP Interceptor
ng g resolver resolvers/user-data      # Route Data Resolver
ng g environments                      # Generate environment.ts configuration files`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* 2. STANDALONE COMPONENTS & SIGNALS */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">2. Standalone Architecture & Signals API</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">Modern component configuration, Signal state primitives, and Signal inputs/outputs.</p>
                <div className="mt-6 space-y-4">
                    <div>
                        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                            {`import { Component, signal, computed, effect, input, output, model, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  // Signal Inputs & Outputs
  userId = input.required<string>();                     // Required input signal
  role = input<string>('guest');                         // Input signal with default fallback
  selected = model<boolean>(false);                       // Two-way binding signal input ([(selected)])
  profileUpdated = output<UserProfile>();                 // Output event emitter

  // Writable & Computed Signals
  count = signal<number>(0);                             // Writable signal state
  doubleCount = computed(() => this.count() * 2);        // Pure derived computed state

  constructor() {
    // Side Effects
    effect((onCleanup) => {
      const timer = setTimeout(() => console.log(this.count()), 1000);
      onCleanup(() => clearTimeout(timer));              // Effect cleanup callback
    });
  }

  mutateState() {
    this.count.set(5);                                   // Direct override
    this.count.update(c => c + 1);                       // Value modification relative to prior state
  }
}`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* 3. CONTROL FLOW & DEFERRABLE VIEWS */}
            <section className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">3. Built-in Control Flow</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Native template control syntax (`@if`, `@for`, `@switch`).</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`@if (isLoggedIn()) {
  <p>Welcome, {{ user().name }}</p>
} @else if (isPending()) {
  <p>Authenticating...</p>
} @else {
  <button (click)="login()">Sign In</button>
}

@for (item of items(); track item.id; let i = $index, count = $count) {
  <div>{{ i + 1 }}/{{ count }}: {{ item.name }}</div>
} @empty {
  <p>No items registered.</p>
}

@switch (userRole()) {
  @case ('admin') { <app-admin-panel /> }
  @case ('editor') { <app-editor-panel /> }
  @default { <app-viewer-panel /> }
}`}
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">4. Deferrable Views (`@defer`)</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Declarative template lazy-loading with triggers.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`@defer (on viewport; prefetch on idle) {
  <app-heavy-chart [data]="chartData()" />
} @placeholder (minimum 500ms) {
  <div class="skeleton">Chart Placeholder</div>
} @loading (after 100ms; minimum 1s) {
  <app-spinner />
} @error {
  <p>Failed to load component bundle.</p>
}

// Triggers: on idle, on viewport, on interaction,
// on hover, on timer(2s), when conditionSignal()`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. DEPENDENCY INJECTION */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">5. Dependency Injection & Hierarchical Injectors</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">Services, functional `inject()`, InjectionTokens, and scoping.</p>
                <div className="mt-6 space-y-4">
                    <div>
                        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                            {`import { Injectable, inject, InjectionToken, ApplicationConfig } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const API_CONFIG = new InjectionToken<ApiConfig>('API_CONFIG');

@Injectable({
  providedIn: 'root'                                   // Singleton service available application-wide
})
export class AuthService {
  private config = inject(API_CONFIG);                 // Functional dependency injection
  private http = inject(HttpClient);
}

// Provider Configurations in app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    { provide: API_CONFIG, useValue: { baseUrl: 'https://api.domain.com' } },
    { provide: LoggerService, useClass: CustomLoggerService }
  ]
};`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* 6. ROUTING & GUARDS */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">6. Routing, Functional Guards & Resolvers</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">Routes setup, route parameters, functional protection, and data resolvers.</p>
                <div className="mt-6 space-y-4">
                    <div>
                        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                            {`import { Routes, CanActivateFn, ResolveFn, inject, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLoggedIn() ? true : router.parseUrl('/login');
};

export const userResolver: ResolveFn<UserData> = (route) => {
  return inject(UserService).getUser(route.paramMap.get('id')!);
};

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'user/:id',
    loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
    resolve: { user: userResolver }
  }
];`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* 7. HTTP INTERCEPTORS */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">7. Functional HTTP Interceptors</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">Intercept requests and responses within HTTP pipelines.</p>
                <div className="mt-6 space-y-4">
                    <div>
                        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                            {`import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getToken();
  const authReq = req.clone({
    setHeaders: { Authorization: \`Bearer \${authToken}\` }
  });
  return next(authReq);
};`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* 8. DIRECTIVES & PIPES */}
            <section className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">8. Custom Directives</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Host listeners and style bindings.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`import { Directive, HostBinding, HostListener, input } from '@angular/core';

@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  highlightColor = input<string>('yellow', { alias: 'appHighlight' });

  @HostBinding('style.backgroundColor') bgColor = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.bgColor = this.highlightColor() || 'yellow';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.bgColor = '';
  }
}`}
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">9. Custom Pipes</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Pure template data transformation.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate', standalone: true, pure: true })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 20, trail = '...'): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
// Usage: {{ text() | truncate:50:'...' }}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. REACTIVE FORMS */}
            <section className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">10. Strictly Typed Reactive Forms</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Typed form controls and built-in validators.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { inject } from '@angular/core';

export class LoginForm {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  onSubmit() {
    if (this.form.valid) {
      const rawData = this.form.getRawValue();
    }
  }
}`}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* 11. RXJS & SIGNALS INTEROP */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">11. RxJS & Signals Interoperability</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Bridging RxJS Streams and Signals.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { signal, inject } from '@angular/core';

// Convert Observable to Signal
usersSignal = toSignal(this.userService.getUsers(), { initialValue: [] });

// Convert Signal to Observable
searchTerm = signal('');
searchTerm$ = toObservable(this.searchTerm);`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* 12. CONTENT PROJECTION & LIFECYCLE */}
            <section className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">12. Projection & Query Signals</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">`viewChild`, `contentChild`, and multi-slot projection.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`<!-- Modal Template -->
<div class="modal">
  <ng-content select="[header]" />
  <ng-content /> <!-- Default Body Slot -->
</div>

// TS Component Class Query Signals
header = viewChild<ElementRef>('header');
children = viewChildren(ChildComponent);
projected = contentChild(TemplateRef);`}
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">13. Lifecycle Hooks & Cleanups</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Execution phases and functional cleanup hooks.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`ngOnInit()          # Executed after input bindings setup
ngOnChanges(c)      # Executed when input properties change
ngAfterViewInit()   # Executed after view initialization
ngOnDestroy()       # Executed before component destruction

// Functional cleanup with DestroyRef
private destroyRef = inject(DestroyRef);
constructor() {
  const sub = stream$.subscribe();
  this.destroyRef.onDestroy(() => sub.unsubscribe());
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* 14. STATE MANAGEMENT */}
            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">14. State Management (Signal Store Pattern)</h2>
                <p className="mt-3 text-slate-600 dark:text-slate-400">Reactive central state management with Signals.</p>
                <div className="mt-6 space-y-4">
                    <div>
                        <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                            {`import { Injectable, signal, computed } from '@angular/core';

export interface CartItem { id: string; price: number; quantity: number; }

@Injectable({ providedIn: 'root' })
export class CartStore {
  private itemsSignal = signal<CartItem[]>([]);

  readonly items = this.itemsSignal.asReadonly();
  readonly itemCount = computed(() => this.itemsSignal().reduce((acc, i) => acc + i.quantity, 0));
  readonly totalPrice = computed(() => this.itemsSignal().reduce((acc, i) => acc + i.price * i.quantity, 0));

  addItem(newItem: CartItem) {
    this.itemsSignal.update(items => {
      const existing = items.find(i => i.id === newItem.id);
      return existing
        ? items.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...items, newItem];
    });
  }

  removeItem(id: string) {
    this.itemsSignal.update(items => items.filter(i => i.id !== id));
  }
}`}
                        </pre>
                    </div>
                </div>
            </section>

            {/* 15. SSR & HYDRATION */}
            <section className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">15. SSR & Event Hydration</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Configure Client Hydration and Fetch API for server render.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ]
});`}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* 16. SECURITY */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">16. Security & DomSanitizer</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">XSS prevention and DOM sanitization.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { inject } from '@angular/core';

export class SecureComponent {
  private sanitizer = inject(DomSanitizer);
  trustedHtml: SafeHtml = '';

  setUntrustedContent(rawHtml: string) {
    this.trustedHtml = this.sanitizer.sanitize(SecurityContext.HTML, rawHtml) || '';
  }
}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* 17. TESTING & LEGACY NGMODULE */}
            <section className="grid gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">17. Unit Testing (`TestBed`)</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Testing Standalone components and service mocks.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`import { TestBed } from '@angular/core/testing';

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [UserProfileComponent],
    providers: [{ provide: UserService, useValue: spy }]
  }).compileComponents();
});`}
                            </pre>
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">18. Legacy `NgModule` Structure</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">Module declarations for non-standalone codebases.</p>
                    <div className="mt-6 space-y-4">
                        <div>
                            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950/10 p-4 font-mono text-sm text-slate-900 dark:bg-slate-900 dark:text-slate-100">
                                {`import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LegacyComponent],
  imports: [CommonModule],
  exports: [LegacyComponent]
})
export class LegacyModule {}`}
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <p className="text-sm">
                    Complete end-to-end Angular cheat sheet covering CLI tooling, Standalone architecture, Signals, template control flow, routing, HTTP interceptors, forms, state management, SSR, security, and unit testing in a single file.
                </p>
            </footer>
        </div>
    );
}