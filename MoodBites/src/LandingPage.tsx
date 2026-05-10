import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Heart, Brain, Target, BookOpen, BarChart3, Users, Award, Zap, Smile } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
                  Your mental wellbeing
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"> matters</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Helping students balance productivity and emotional wellbeing through mood tracking,
                  habit building, and personalized insights for better academic performance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register" className="bg-[var(--color-brand-primary)] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[var(--color-brand-strong)] transition-all duration-200 hover:shadow-lg hover:shadow-[rgba(124,58,237,0.2)]">
                  Start Your Journey
                </Link>
                <Link to="/login" className="border border-[var(--color-border)] text-[var(--color-text-primary)] bg-[var(--color-surface-soft)] px-8 py-4 rounded-xl font-semibold hover:bg-[var(--color-surface)] transition-colors">
                  Sign In
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* Mock Dashboard Preview */}
              <div className="public-card rounded-[2rem] p-8 border border-[var(--color-border)]">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-[var(--color-brand-primary)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Today's Focus</p>
                        <p className="text-sm text-[var(--color-text-secondary)]">2h 15m completed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[var(--color-text-secondary)]">Mood Lifts</p>
                      <p className="font-bold text-slate-900">3/3</p>
                    </div>
                  </div>

                  {/* Mood Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[var(--color-surface-soft)] rounded-xl p-4 border border-[var(--color-border)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Smile className="w-4 h-4 text-[var(--color-brand-primary)]" />
                        <span className="text-xs font-medium text-[var(--color-brand-primary)]">Good</span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)]">After session</p>
                    </div>
                    <div className="bg-[var(--color-surface-soft)] rounded-xl p-4 border border-[var(--color-border)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-slate-600" />
                        <span className="text-xs font-medium text-slate-700">Okay</span>
                      </div>
                      <p className="text-xs text-[var(--color-text-secondary)]">Before session</p>
                    </div>
                    <div className="bg-[var(--color-surface-soft)] rounded-xl p-4 border border-[var(--color-border)]">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-[var(--color-brand-primary)]" />
                        <span className="text-xs font-medium text-[var(--color-brand-primary)]">Focus</span>
                      </div>
                      <p className="text-xs text-[var(--color-brand-primary)]">45 min session</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-secondary)]">Weekly Progress</span>
                      <span className="font-medium text-slate-900">85%</span>
                    </div>
                    <div className="w-full bg-[var(--color-surface-soft)] rounded-full h-2">
                      <div className="bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--color-surface-soft)] rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-[var(--color-brand-primary)]" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-[var(--color-brand-soft)] rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-[var(--color-brand-secondary)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Impact of Student Wellbeing</h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Understanding how mental health and daily habits influence academic success and personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="public-card rounded-2xl p-8 hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Academic Burnout</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Studies show that up to 70% of students experience significant academic stress that impacts their mental wellbeing and performance.
              </p>
              <div className="text-2xl font-bold text-[var(--color-brand-primary)]">70%</div>
              <p className="text-sm text-[var(--color-text-secondary)]">of students affected</p>
            </div>

            <div className="public-card rounded-2xl p-8 hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-[var(--color-brand-secondary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mental Wellbeing</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Students with better emotional balance show 25% higher academic performance and improved learning outcomes.
              </p>
              <div className="text-2xl font-bold text-[var(--color-brand-secondary)]">+25%</div>
              <p className="text-sm text-[var(--color-text-secondary)]">performance increase</p>
            </div>

            <div className="public-card rounded-2xl p-8 hover:shadow-xl transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Daily Habits</h3>
              <p className="text-[var(--color-text-secondary)] mb-4">
                Consistent healthy habits can reduce stress levels by 40% and improve focus during study sessions.
              </p>
              <div className="text-2xl font-bold text-[var(--color-brand-primary)]">-40%</div>
              <p className="text-sm text-[var(--color-text-secondary)]">stress reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="public-card rounded-3xl p-12">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)] rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About MoodBites</h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
              MoodBites is a student-led initiative from Kaunas University of Technology, developed by a team of 5 passionate students
              who believe in the power of technology to support mental wellbeing in academic environments.
            </p>
            <p className="text-[var(--color-text-secondary)] mb-8">
              Our mission is to create tools that help students maintain emotional balance, build healthy habits, and achieve
              their academic goals while prioritizing their mental health. Through data-driven insights and gentle guidance,
              we empower students to take control of their wellbeing journey.
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[var(--color-brand-primary)]" />
                <span>KTU Student Project</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[var(--color-brand-primary)]" />
                <span>5 Student Developers</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[var(--color-brand-primary)]" />
                <span>Student Wellbeing Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need for Better Wellbeing</h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Comprehensive tools designed specifically for students to track, understand, and improve their emotional health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="public-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <Smile className="w-6 h-6 text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mood Tracking</h3>
              <p className="text-[var(--color-text-secondary)]">
                Daily mood logging with visual insights to understand your emotional patterns and triggers.
              </p>
            </div>

            <div className="public-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[var(--color-brand-secondary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Habit Building</h3>
              <p className="text-[var(--color-text-secondary)]">
                Track and build healthy daily habits that support your academic success and wellbeing.
              </p>
            </div>

            <div className="public-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Focus Sessions</h3>
              <p className="text-[var(--color-text-secondary)]">
                Guided focus sessions with mood tracking to optimize your study productivity.
              </p>
            </div>

            <div className="public-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-[var(--color-brand-secondary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Analytics & Insights</h3>
              <p className="text-[var(--color-text-secondary)]">
                Data-driven insights about your wellbeing patterns and productivity trends.
              </p>
            </div>

            <div className="public-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-[var(--color-brand-primary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Journal Entries</h3>
              <p className="text-[var(--color-text-secondary)]">
                Private journaling space to reflect on your experiences and emotional growth.
              </p>
            </div>

            <div className="public-card rounded-2xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-[var(--color-surface-soft)] rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-[var(--color-brand-secondary)]" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Emotional Support</h3>
              <p className="text-[var(--color-text-secondary)]">
                Gentle reminders and guidance to maintain emotional balance throughout your studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Wellbeing Journey?</h2>
          <p className="text-xl text-[rgba(255,255,255,0.85)] mb-8">
            Join thousands of students who are taking control of their mental health and academic success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-[var(--color-brand-primary)] px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
              Create Your Account
            </Link>
            <Link to="/login" className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/15 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;