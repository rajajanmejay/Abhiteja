import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Phone, Heart } from 'lucide-react';

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

  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attending: '',
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your RSVP!');
  };

  return (
    <div className="min-h-screen bg-[#f9eef1] text-slate-800">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-serif text-[#8a4f72] font-bold">
            Abhishek & Tejakshi
          </h1>
          <span className="text-sm">May 29, 2026</span>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "url('/invitation.jpg')"
        }}
      >
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-3xl text-center max-w-3xl shadow-xl">
          <h1 className="text-6xl md:text-7xl font-serif text-[#8a4f72] mb-4">
            Abhishek & Tejakshi
          </h1>
          <p className="text-xl italic mb-6">
            Together with their families invite you
          </p>
          <p className="text-lg">
            Friday, May 29, 2026 • Reception at 6 PM
          </p>
          <p className="mt-3">
            HMT Executive Club, Gangamma Circle, Jalahalli, Bangalore
          </p>
        </div>
      </section>

      {/* Countdown */}
      <section className="py-20 px-4">
        <h2 className="text-center text-4xl font-serif text-[#8a4f72] mb-12">
          Time Left For Wedding
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
          {[
            { label: 'Days', value: countdown.days },
            { label: 'Hours', value: countdown.hours },
            { label: 'Minutes', value: countdown.minutes },
            { label: 'Seconds', value: countdown.seconds },
          ].map((item) => (
            <Card key={item.label} className="p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-[#8a4f72]">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="mt-2 text-sm">{item.label}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="py-16 px-4 bg-white/60">
        <h2 className="text-center text-4xl font-serif text-[#8a4f72] mb-12">
          Wedding Events
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Muhurtham</h3>
            <p>5:30 AM – 7:30 AM</p>
            <p>Sacred Wedding Ceremony</p>
          </Card>

          <Card className="p-8 shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Reception</h3>
            <p>6:00 PM onwards</p>
            <p>Celebration & Dinner</p>
          </Card>
        </div>
      </section>

      {/* RSVP */}
      <section className="py-20 px-4">
        <h2 className="text-center text-4xl font-serif text-[#8a4f72] mb-12">
          RSVP
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl space-y-6"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-4 rounded-xl"
            required
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />

          <input
            type="number"
            min="1"
            placeholder="How many attending?"
            className="w-full border p-4 rounded-xl"
            required
            onChange={(e) =>
              setFormData({ ...formData, guests: e.target.value })
            }
          />

          <select
            className="w-full border p-4 rounded-xl"
            required
            onChange={(e) =>
              setFormData({ ...formData, attending: e.target.value })
            }
          >
            <option value="">Select Event</option>
            <option>Both Events</option>
            <option>Only Muhurtham</option>
            <option>Only Reception</option>
          </select>

          <Button className="w-full bg-[#8a4f72] hover:bg-[#733b5e] text-white py-4 rounded-xl">
            Submit RSVP
          </Button>
        </form>
      </section>

      {/* Quote */}
      <section className="py-16 px-4 bg-white/60">
        <div className="max-w-4xl mx-auto text-center italic text-xl leading-loose text-[#6a4b5d]">
          “To love or have loved, that is enough. Ask nothing further.
          There is no other pearl to be found in the dark folds of life.”
          <br />
          <span className="font-semibold">
            — Victor Hugo, Les Misérables
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-14 px-4 text-center">
        <h3 className="text-2xl font-serif text-[#8a4f72] mb-3">
          Abhishek & Tejakshi
        </h3>

        <p className="mb-4">May 29, 2026</p>

        <div className="space-y-2">
          <p>📞 +91 97412 15772</p>
          <p>📞 +91 78925 83234</p>
        </div>
      </footer>
    </div>
  );
}