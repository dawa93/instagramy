'use client';

import { SmileIcon } from './ui/icons';

function CommentFrom() {
  return (
    <form className="flex items-center px-3 border-t border-neutral-300 p-3">
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none"
        type="text"
        placeholder="add a comment..."
      />
      <button className="font-bold text-sky-500 ml-2">Post</button>
    </form>
  );
}

export default CommentFrom;
