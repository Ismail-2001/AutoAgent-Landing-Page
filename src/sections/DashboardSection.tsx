import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const DashboardSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: '-10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        dashboardRef.current,
        { y: '18vh', scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'none' },
        0
      );

      // Metric items
      const metricItems = dashboardRef.current?.querySelectorAll('.metric-item');
      if (metricItems) {
        scrollTl.fromTo(
          metricItems,
          { x: '-6vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.08
        );
      }

      // Feed rows
      const feedRows = dashboardRef.current?.querySelectorAll('.feed-row');
      if (feedRows) {
        scrollTl.fromTo(
          feedRows,
          { x: '6vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.03, ease: 'none' },
          0.1
        );
      }

      // SETTLE (30%-70%): Hold

      // EXIT (70%-100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-4vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        dashboardRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-6vh', scale: 0.98, opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (metricItems) {
        scrollTl.fromTo(
          metricItems,
          { x: 0, opacity: 1 },
          { x: '-3vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.72
        );
      }

      if (feedRows) {
        scrollTl.fromTo(
          feedRows,
          { x: 0, opacity: 1 },
          { x: '3vw', opacity: 0, ease: 'power2.in', stagger: 0.02 },
          0.72
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const metrics = [
    {
      label: 'Revenue today',
      value: '$27,598',
      change: '+12.5%',
      trend: 'up',
    },
    {
      label: 'Active orders',
      value: '142',
      change: '+8.2%',
      trend: 'up',
    },
    {
      label: 'Low stock items',
      value: '3',
      change: '-2',
      trend: 'down',
    },
    {
      label: 'Recovered 24h',
      value: '$1,037.98',
      change: 'No manual action',
      trend: 'neutral',
    },
  ];

  const feedItems = [
    {
      time: '2m ago',
      agent: 'Recovery Agent',
      action: 'drafted email for cart #9281',
      detail: 'Value: $349',
    },
    {
      time: '15m ago',
      agent: 'Inventory Agent',
      action: 'flagged "Lumina Lamp" as low stock',
      detail: '',
    },
    {
      time: '1h ago',
      agent: 'Success Agent',
      action: 'identified VIP: Bob Smith',
      detail: '$1,299',
    },
    {
      time: '3h ago',
      agent: 'Recovery Agent',
      action: 'sent discount code to Sarah Jenkins',
      detail: '',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} className="text-lime" />;
      case 'down':
        return <TrendingDown size={14} className="text-lime" />;
      default:
        return <Minus size={14} className="text-gray-secondary" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark flex items-center relative z-40"
    >
      <div className="w-full px-6 lg:px-[7vw]">
        {/* Headline */}
        <div ref={headlineRef} className="text-center mb-8 lg:mb-10">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-bold text-gray-primary mb-4">
            Live <span className="text-lime">command center</span>
          </h2>
          <p className="text-base lg:text-lg text-gray-secondary max-w-2xl mx-auto">
            See what your agents are doing—without opening a dozen tabs.
          </p>
        </div>

        {/* Dashboard Card */}
        <div
          ref={dashboardRef}
          className="card-glass relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime" />

          <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
            {/* Left: Metrics */}
            <div className="p-5 lg:p-8">
              <div className="grid grid-cols-2 gap-5">
                {metrics.map((metric, index) => (
                  <div key={index} className="metric-item">
                    <p className="text-sm text-gray-secondary mb-1">
                      {metric.label}
                    </p>
                    <p className="font-display text-2xl lg:text-3xl font-bold text-gray-primary mb-1">
                      {metric.value}
                    </p>
                    <div className="flex items-center gap-1.5">
                      {getTrendIcon(metric.trend)}
                      <span
                        className={`text-xs font-mono ${
                          metric.trend === 'neutral'
                            ? 'text-gray-secondary'
                            : 'text-lime'
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Activity Feed */}
            <div className="p-5 lg:p-8">
              <h3 className="font-display font-semibold text-lg text-gray-primary mb-5 flex items-center gap-2">
                <Clock size={18} className="text-lime" />
                Agent activity
              </h3>

              <div className="space-y-4">
                {feedItems.map((item, index) => (
                  <div
                    key={index}
                    className="feed-row flex items-start gap-3 text-sm"
                  >
                    <span className="font-mono text-xs text-gray-secondary flex-shrink-0 w-14">
                      {item.time}
                    </span>
                    <div className="flex-1">
                      <span className="text-lime font-medium">
                        {item.agent}
                      </span>{' '}
                      <span className="text-gray-secondary">{item.action}</span>
                      {item.detail && (
                        <span className="text-gray-secondary ml-1">
                          ({item.detail})
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;
