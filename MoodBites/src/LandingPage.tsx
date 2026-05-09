import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Heart, Brain, Target, BookOpen, BarChart3, Users, Award, Zap, Smile } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/60 z-50">
        <div className="max-w-7xl mx-auto h-full px-6">
          <div className="h-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">MoodBites</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-slate-600 hover:text-slate-900 transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors whitespace-nowrap">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
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
                <Link to="/register" className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition-all duration-200 hover:shadow-lg hover:shadow-purple-200">
                  Start Your Journey
                </Link>
                <Link to="/login" className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                  Sign In
                </Link>
              </div>
            </div>

            <div className="relative">
              {/* Mock Dashboard Preview */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-purple-100/50 p-8 border border-slate-200/50">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Today's Focus</p>
                        <p className="text-sm text-slate-500">2h 15m completed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-500">Mood Lifts</p>
                      <p className="font-bold text-slate-900">3/3</p>
                    </div>
                  </div>

                  {/* Mood Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Smile className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-medium text-green-700">Good</span>
                      </div>
                      <p className="text-xs text-green-600">After session</p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-slate-600" />
                        <span className="text-xs font-medium text-slate-700">Okay</span>
                      </div>
                      <p className="text-xs text-slate-500">Before session</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-200/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-medium text-purple-700">Focus</span>
                      </div>
                      <p className="text-xs text-purple-600">45 min session</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Weekly Progress</span>
                      <span className="font-medium text-slate-900">85%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full" style={{width: '85%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center shadow-lg">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">The Impact of Student Wellbeing</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Understanding how mental health and daily habits influence academic success and personal growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Academic Burnout</h3>
              <p className="text-slate-600 mb-4">
                Studies show that up to 70% of students experience significant academic stress that impacts their mental wellbeing and performance.
              </p>
              <div className="text-2xl font-bold text-red-600">70%</div>
              <p className="text-sm text-slate-500">of students affected</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mental Wellbeing</h3>
              <p className="text-slate-600 mb-4">
                Students with better emotional balance show 25% higher academic performance and improved learning outcomes.
              </p>
              <div className="text-2xl font-bold text-blue-600">+25%</div>
              <p className="text-sm text-slate-500">performance increase</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Daily Habits</h3>
              <p className="text-slate-600 mb-4">
                Consistent healthy habits can reduce stress levels by 40% and improve focus during study sessions.
              </p>
              <div className="text-2xl font-bold text-green-600">-40%</div>
              <p className="text-sm text-slate-500">stress reduction</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 shadow-lg shadow-slate-100 border border-slate-200/50">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">About MoodBites</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              MoodBites is a student-led initiative from Kaunas University of Technology, developed by a team of 5 passionate students
              who believe in the power of technology to support mental wellbeing in academic environments.
            </p>
            <p className="text-slate-600 mb-8">
              Our mission is to create tools that help students maintain emotional balance, build healthy habits, and achieve
              their academic goals while prioritizing their mental health. Through data-driven insights and gentle guidance,
              we empower students to take control of their wellbeing journey.
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>KTU Student Project</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>5 Student Developers</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Student Wellbeing Focus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need for Better Wellbeing</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive tools designed specifically for students to track, understand, and improve their emotional health.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Smile className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Mood Tracking</h3>
              <p className="text-slate-600">
                Daily mood logging with visual insights to understand your emotional patterns and triggers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Habit Building</h3>
              <p className="text-slate-600">
                Track and build healthy daily habits that support your academic success and wellbeing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Focus Sessions</h3>
              <p className="text-slate-600">
                Guided focus sessions with mood tracking to optimize your study productivity.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Analytics & Insights</h3>
              <p className="text-slate-600">
                Data-driven insights about your wellbeing patterns and productivity trends.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Journal Entries</h3>
              <p className="text-slate-600">
                Private journaling space to reflect on your experiences and emotional growth.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-100 border border-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Emotional Support</h3>
              <p className="text-slate-600">
                Gentle reminders and guidance to maintain emotional balance throughout your studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Wellbeing Journey?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of students who are taking control of their mental health and academic success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors">
              Create Your Account
            </Link>
            <Link to="/login" className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MoodBites</span>
              </div>
              <p className="text-slate-400">
                Supporting student wellbeing through technology and compassion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Mood Tracking</li>
                <li>Habit Building</li>
                <li>Focus Sessions</li>
                <li>Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-slate-400">
                <li>KTU Project</li>
                <li>Student Team</li>
                <li>Our Mission</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Feedback</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 MoodBites. Built by KTU students for student wellbeing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;