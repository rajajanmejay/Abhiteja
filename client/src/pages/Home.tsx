import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Home() {
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const weddingDate = new Date('2026-05-29T05:30:00').getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRSVP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      guests: formData.get("guests"),
      event: formData.get("event"),
    };

    await fetch(
      "https://script.google.com/macros/s/AKfycbyxCTB7U-nW_hVTljp1it3Ly7T-zdTrqJwDEKrxuXO7eqHajJuRgOB1yCKOQB0Ku-Ezdg/exec",
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );

    alert("Thank you! RSVP submitted.");
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-display text-primary">
            Abhishek & Tejakshi
          </h1>
          <div className="text-sm text-foreground/70">May 29, 2026</div>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663599308526/TwaNmUDhvhMEyP8PmsFKJu/wedding_hero_background-7K9uwTimMG9MTjuHRBDEuq.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>

        <div className="relative z-10 text-center px-4 max-w-2xl">
          <div className="mb-8 flex justify-center">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663599308526/TwaNmUDhvhMEyP8PmsFKJu/couple_silhouette_romantic-ckbuxBoBdnQnxikfS5hMkP.webp"
              alt="Bride and Groom"
              className="w-48 h-48 object-contain mx-auto"
            />
          </div>

          <h1 className="text-6xl md:text-7xl font-display text-primary mb-4">
            Abhishek & Tejakshi
          </h1>

          <p className="text-xl text-foreground/80 mb-8 font-light">
            Together in love, united in celebration
          </p>

          <p className="text-lg text-foreground/70">May 29, 2026</p>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-12 bg-background">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663599308526/TwaNmUDhvhMEyP8PmsFKJu/floral_divider_ornament-VDeW4ABvyax7xxMC6z8paw.webp"
          alt="Divider"
          className="w-full max-w-2xl h-auto"
        />
      </div>

      {/* Countdown */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-center font-display text-4xl text-primary mb-12">
            Time Left For Wedding
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white rounded-xl p-6 text-center border border-border shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl font-display text-primary mb-2">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-sm text-foreground/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-12 bg-background">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663599308526/TwaNmUDhvhMEyP8PmsFKJu/floral_divider_ornament-VDeW4ABvyax7xxMC6z8paw.webp"
          alt="Divider"
          className="w-full max-w-2xl h-auto"
        />
      </div>

      {/* Events */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-center font-display text-4xl text-primary mb-12">
            Wedding Events
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Muhurtham */}
            <Card className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-primary shrink-0" />
                  <h3 className="text-2xl font-display text-primary">
                    Muhurtham
                  </h3>
                </div>

                <div className="space-y-4 text-foreground/80">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary/60 shrink-0" />
                    <span>29 May 2026 • 5:30 AM – 7:00 AM</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary/60 shrink-0 mt-1" />
                    <span>
                      Thangamalai Shri Subrahmanya Swamy Temple,
                      Kaval Byrasandra, Bangalore - 560006
                    </span>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/yYJXgBh9RkVdDdXc7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-7 w-full bg-primary text-white px-5 py-3 rounded-xl font-medium shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-300"
                >
                  📍 Open in Google Maps
                </a>
              </div>
            </Card>

            {/* Reception */}
            <Card className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-primary shrink-0" />
                  <h3 className="text-2xl font-display text-primary">
                    Reception
                  </h3>
                </div>

                <div className="space-y-4 text-foreground/80">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary/60 shrink-0" />
                    <span>29 May 2026 • 6:00 PM Onwards</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary/60 shrink-0 mt-1" />
                    <span>
                      HMT Executive Club, Gangamma Circle,
                      Jalahalli, Bangalore - 560013
                    </span>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/vV7Pxu2pQf96o3p66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center mt-7 w-full bg-primary text-white px-5 py-3 rounded-xl font-medium shadow-md hover:shadow-xl hover:brightness-110 transition-all duration-300"
                >
                  📍 Open in Google Maps
                </a>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663599308526/TwaNmUDhvhMEyP8PmsFKJu/mandap_illustration-N7gXB2Hv56eght6WHwyayc.webp"
              alt="Wedding Mandap"
              className="w-full h-auto rounded-2xl shadow-lg mb-10"
            />

            <div className="text-center max-w-3xl mx-auto px-4">
              <h2 className="font-display text-4xl text-primary mb-5">
                A Sacred Union
              </h2>

              <p className="text-foreground/80 leading-relaxed text-lg">
                Under the sacred mandap, two hearts unite in a beautiful ceremony
                steeped in tradition, love, and the blessings of family.
                We invite you to be part of this momentous occasion as
                Abhishek and Tejakshi embark on their journey together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-16 bg-background">
        <div className="container max-w-2xl mx-auto px-4">
          <h2 className="text-center font-display text-4xl text-primary mb-10">
            RSVP
          </h2>

          <form
            onSubmit={handleRSVP}
            className="bg-white rounded-2xl p-8 shadow-sm border border-border space-y-5"
          >
            <input
              name="name"
              type="text"
              required
              placeholder="Your Name"
              className="w-full border p-3 rounded-xl"
            />

            <input
              name="guests"
              type="number"
              min="1"
              required
              placeholder="How many attending including you?"
              className="w-full border p-3 rounded-xl"
            />

            <select
              name="event"
              required
              className="w-full border p-3 rounded-xl"
            >
              <option value="">Select Event</option>
              <option value="Both Events">Both Events</option>
              <option value="Only Muhurtham">Only Muhurtham</option>
              <option value="Only Reception">Only Reception</option>
            </select>

            <Button className="w-full rounded-xl py-6">
              Submit RSVP
            </Button>
          </form>
        </div>
      </section>

      {/* Quote */}
      <section className="py-16 bg-background">
        <div className="container max-w-4xl mx-auto text-center italic text-lg text-foreground/80 leading-relaxed px-4">
          “To love or have loved, that is enough. Ask nothing further.
          There is no other pearl to be found in the dark folds of life.”
          <br />
          <br />
          — Victor Hugo, Les Misérables
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-border py-12">
        <div className="container text-center px-4">
          <h3 className="font-display text-2xl text-primary mb-2">
            Abhishek & Tejakshi
          </h3>

          <p className="text-foreground/70 mb-2">May 29, 2026</p>

          <p className="text-foreground/70">+91 97412 15772</p>
          <p className="text-foreground/70 mb-6">+91 78925 83234</p>

          <p className="text-sm text-foreground/60">
            Two souls, one beautiful journey
          </p>
        </div>
      </footer>
    </div>
  );
}

{/* Quote */ }
<section className="py-16 bg-background">
  <div className="container max-w-4xl mx-auto text-center italic text-lg text-foreground/80 leading-relaxed px-4">
    “To love or have loved, that is enough. Ask nothing further.
    There is no other pearl to be found in the dark folds of life.”
    <br />
    <br />
    — Victor Hugo, Les Misérables
  </div>
</section>

{/* Footer */ }
<footer className="bg-white border-t border-border py-12">
  <div className="container text-center px-4">
    <h3 className="font-display text-2xl text-primary mb-2">
      Abhishek & Tejakshi
    </h3>

    <p className="text-foreground/70 mb-2">May 29, 2026</p>

    <p className="text-foreground/70">+91 97412 15772</p>
    <p className="text-foreground/70 mb-6">+91 78925 83234</p>

    <p className="text-sm text-foreground/60">
      "Two souls, one beautiful journey"
    </p>
  </div>
</footer>
        </div>
        );
}