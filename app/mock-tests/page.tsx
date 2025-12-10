'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';

interface MockTest {
  id: string;
  test_date: string;
  listening_score: number | null;
  reading_score: number | null;
  writing_score: number | null;
  speaking_score: number | null;
  overall_score: number | null;
  notes: string | null;
}

export default function MockTestsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [tests, setTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [testDate, setTestDate] = useState('');
  const [listeningScore, setListeningScore] = useState('');
  const [readingScore, setReadingScore] = useState('');
  const [writingScore, setWritingScore] = useState('');
  const [speakingScore, setSpeakingScore] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTests();
    }
  }, [user]);

  const fetchTests = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('mock_tests')
      .select('*')
      .eq('user_id', user.id)
      .order('test_date', { ascending: false });

    if (data) setTests(data);
    setLoading(false);
  };

  const calculateOverall = (l: number, r: number, w: number, s: number) => {
    return ((l + r + w + s) / 4).toFixed(1);
  };

  const handleAddTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const l = parseFloat(listeningScore);
    const r = parseFloat(readingScore);
    const w = parseFloat(writingScore);
    const s = parseFloat(speakingScore);
    const overall = parseFloat(calculateOverall(l, r, w, s));

    const { error } = await supabase.from('mock_tests').insert([
      {
        user_id: user.id,
        test_date: testDate,
        listening_score: l,
        reading_score: r,
        writing_score: w,
        speaking_score: s,
        overall_score: overall,
        notes,
      },
    ]);

    if (!error) {
      setTestDate('');
      setListeningScore('');
      setReadingScore('');
      setWritingScore('');
      setSpeakingScore('');
      setNotes('');
      setShowAddForm(false);
      fetchTests();
    }
  };

  const getBandColor = (score: number | null) => {
    if (!score) return 'bg-gray-100 text-gray-700';
    if (score >= 8) return 'bg-green-100 text-green-700';
    if (score >= 7) return 'bg-blue-100 text-blue-700';
    if (score >= 6) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto max-w-7xl px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Mock Tests</h1>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Test Scores</h2>
            <p className="text-gray-600 mt-1">{tests.length} tests recorded</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Test
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Add Mock Test Score</h3>
            <form onSubmit={handleAddTest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Date *
                </label>
                <input
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Listening *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9"
                    value={listeningScore}
                    onChange={(e) => setListeningScore(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="7.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reading *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9"
                    value={readingScore}
                    onChange={(e) => setReadingScore(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="8.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Writing *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9"
                    value={writingScore}
                    onChange={(e) => setWritingScore(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="6.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speaking *
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="9"
                    value={speakingScore}
                    onChange={(e) => setSpeakingScore(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="7.0"
                  />
                </div>
              </div>
              {listeningScore && readingScore && writingScore && speakingScore && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Overall Band Score:</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {calculateOverall(
                      parseFloat(listeningScore),
                      parseFloat(readingScore),
                      parseFloat(writingScore),
                      parseFloat(speakingScore)
                    )}
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What went well? What needs improvement?"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Test
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Test - {new Date(test.test_date).toLocaleDateString()}
                  </h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    Overall: {test.overall_score}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full font-semibold ${getBandColor(
                    test.overall_score
                  )}`}
                >
                  Band {test.overall_score}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-gray-600">Listening</p>
                  <p className="text-2xl font-bold text-gray-900">{test.listening_score}</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-gray-600">Reading</p>
                  <p className="text-2xl font-bold text-gray-900">{test.reading_score}</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-gray-600">Writing</p>
                  <p className="text-2xl font-bold text-gray-900">{test.writing_score}</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-sm text-gray-600">Speaking</p>
                  <p className="text-2xl font-bold text-gray-900">{test.speaking_score}</p>
                </div>
              </div>
              {test.notes && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700 mb-1">Notes:</p>
                  <p className="text-gray-600">{test.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {tests.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No mock tests recorded yet. Add your first test score!</p>
          </div>
        )}
      </div>
    </div>
  );
}
