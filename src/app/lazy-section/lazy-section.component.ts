import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EnvironmentInjector,
  Input,
  OnDestroy,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-lazy-section',
  standalone: true,
  templateUrl: './lazy-section.component.html',
  styleUrl: './lazy-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazySectionComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) sectionId!: string;
  @Input({ required: true }) eyebrow!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) loadComponent!: () => Promise<Type<unknown>>;

  @ViewChild('contentHost', { read: ViewContainerRef })
  private readonly contentHost?: ViewContainerRef;

  @ViewChild('sectionRef')
  private readonly sectionRef?: ElementRef<HTMLElement>;

  protected isVisible = false;
  protected isLoaded = false;

  private observer?: IntersectionObserver;
  private readonly minimumSkeletonMs = 450;

  constructor(
    private readonly injector: EnvironmentInjector,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    if (!this.sectionRef) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || this.isLoaded) {
          return;
        }

        this.isVisible = true;
        this.changeDetectorRef.markForCheck();
        void this.renderLazyComponent();
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.35
      }
    );

    this.observer.observe(this.sectionRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private async renderLazyComponent(): Promise<void> {
    if (!this.contentHost || this.isLoaded) {
      return;
    }

    const [component] = await Promise.all([
      this.loadComponent(),
      this.waitForSkeleton()
    ]);

    this.contentHost.clear();
    this.contentHost.createComponent(component, {
      environmentInjector: this.injector
    });

    this.isLoaded = true;
    this.observer?.disconnect();
    this.changeDetectorRef.markForCheck();
  }

  private waitForSkeleton(): Promise<void> {
    return new Promise((resolve) => {
      window.setTimeout(() => resolve(), this.minimumSkeletonMs);
    });
  }
}
