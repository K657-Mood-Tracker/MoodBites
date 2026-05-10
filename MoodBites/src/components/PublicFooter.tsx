import { Heart } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--color-surface)] flex items-center justify-center text-[var(--color-brand-primary)] shadow-sm shadow-[rgba(255,255,255,0.18)]">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">MoodBites</span>
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.82)] max-w-md">
              Supporting student wellbeing through technology, gentle insights, and healthy study habits.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-3 text-[rgba(255,255,255,0.78)] text-sm">
              <li> Mood Tracking</li>
              <li> Habit Building</li>
              <li> Focus Sessions</li>
              <li> Emotional Analytics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">About</h4>
            <ul className="space-y-3 text-[rgba(255,255,255,0.78)] text-sm">
              <li>KTU Student Project</li>
              <li>5 Student Developers</li>
              <li>Wellbeing Focus</li>
              <li>Community Impact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-3 text-[rgba(255,255,255,0.78)] text-sm">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Feedback</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-[rgba(255,255,255,0.15)] pt-6 text-sm text-[rgba(255,255,255,0.72)] text-center">
          <p className="footer-copy">&copy; 2024 MoodBites. Built by KTU students for student wellbeing.</p>
        </div>
      </div>
    </footer>
  );
}
