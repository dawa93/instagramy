'use client';

import { FormEvent, useState } from 'react';
import { SmileIcon } from './ui/icons';

type Props = {
  onPostComment: (comment: string) => void;
};

function CommentFrom({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onPostComment(comment);
    setComment('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 border-t border-neutral-300 p-3"
    >
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none"
        type="text"
        placeholder="add a comment..."
        value={comment}
        required
        onChange={e => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 ${buttonDisabled ? 'text-sky-300' : 'text-sky-500'}`}
      >
        Post
      </button>
    </form>
  );
}

export default CommentFrom;
