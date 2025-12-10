'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Plus, Check } from 'lucide-react';
import Link from 'next/link';

interface Vocabulary {
  id: string;
  word: string;
  definition: string | null;
  example_sentence: string | null;
  category: string | null;
  learned: boolean;
  created_at: string;
}

export default function VocabularyPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [vocabulary, setVocabulary] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchVocabulary();
    }
  }, [user]);

  const fetchVocabulary = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (data) setVocabulary(data);
    setLoading(false);
  };

  const handleAddWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { error } = await supabase.from('vocabulary').insert([
      {
        user_id: user.id,
        word,
        definition,
        example_sentence: example,
        category,
        learned: false,
      },
    ]);

    if (!error) {
      setWord('');
      setDefinition('');
      setExample('');
      setCategory('');
      setShowAddForm(false);
      fetchVocabulary();
    }
  };

  const toggleLearned = async (id: string, currentStatus: boolean) => {
    await supabase
      .from('vocabulary')
      .update({ learned: !currentStatus })
      .eq('id', id);

    fetchVocabulary();
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
          <h1 className="text-2xl font-bold text-gray-900">Vocabulary Bank</h1>
        </div>
      </nav>

      <div className="container mx-auto max-w-7xl p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Words</h2>
            <p className="text-gray-600 mt-1">{vocabulary.length} words saved</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Word
          </button>
        </div>

        {showAddForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">Add New Word</h3>
            <form onSubmit={handleAddWord} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Word *
                  </label>
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., ubiquitous"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Academic, Business"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Definition *
                </label>
                <input
                  type="text"
                  value={definition}
                  onChange={(e) => setDefinition(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Present everywhere"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Example Sentence
                </label>
                <textarea
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Smartphones are ubiquitous in modern society."
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
                  Add Word
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vocabulary.map((vocab) => (
            <div
              key={vocab.id}
              className={`bg-white rounded-xl shadow-md p-6 border-2 transition ${
                vocab.learned ? 'border-green-500 bg-green-50' : 'border-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{vocab.word}</h3>
                  {vocab.category && (
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {vocab.category}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => toggleLearned(vocab.id, vocab.learned)}
                  className={`p-2 rounded-full transition ${
                    vocab.learned
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  <Check size={16} />
                </button>
              </div>
              {vocab.definition && (
                <p className="text-gray-700 mb-2">
                  <strong>Definition:</strong> {vocab.definition}
                </p>
              )}
              {vocab.example_sentence && (
                <p className="text-gray-600 text-sm italic">
                  "{vocab.example_sentence}"
                </p>
              )}
            </div>
          ))}
        </div>

        {vocabulary.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No words added yet. Start building your vocabulary!</p>
          </div>
        )}
      </div>
    </div>
  );
}
