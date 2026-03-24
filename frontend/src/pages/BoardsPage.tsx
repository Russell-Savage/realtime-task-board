import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBoards } from '../hooks/useBoards';
import { useAuth } from '../context/AuthContext';

const BoardsPage: React.FC = () => {
  const { boards, loading: boardsLoading, createBoard } = useBoards();
  const { token, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [newBoardName, setNewBoardName] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!authLoading && !token) {
      navigate('/login', { replace: true });
    }
  }, [token, authLoading, navigate]);

  if (authLoading || boardsLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

const handleCreateBoard = async (e: React.SubmitEvent<HTMLFormElement>) => {
  console.log('🎯 FORM FIRED'); // #1
  e.preventDefault();
  console.log('Name:', newBoardName); // #2
  if (!newBoardName.trim()) {
    console.log('❌ Empty name');
    return;
  }

  setCreating(true);
  try {
    console.log('🚀 Calling createBoard'); // #3
    const board = await createBoard(newBoardName);
    console.log('✅ SUCCESS:', board);
  } catch (error) {
    console.error('💥 ERROR:', error); // #4
  } finally {
    setCreating(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Boards</h1>
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Home
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

<form onSubmit={(e) => {
  console.log('🎯 RAW FORM EVENT FIRED'); // #1 - fires first
  handleCreateBoard(e);
}}>
  <div className="flex gap-3">
    <input
      type="text"
      value={newBoardName}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('Typing:', e.target.value); // #2 - test typing
        setNewBoardName(e.target.value);
      }}
      placeholder="Board name (e.g. Project Alpha)"
      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      maxLength={100}
    />
    <button
      type="submit" // ✅ CRITICAL
      disabled={creating || !newBoardName.trim()}
    >
      {creating ? 'Creating...' : 'Create Board'}
    </button>
  </div>
</form>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board._id}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            onClick={() => navigate(`/board/${board._id}`)}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
              {board.name}
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              {board.tasks.length} task{board.tasks.length !== 1 ? 's' : ''}
            </p>
            <p className="text-xs text-gray-400">
              Updated {new Date(board.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {boards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No boards yet. Create your first one!</p>
        </div>
      )}
    </div>
  );
};

export default BoardsPage;
