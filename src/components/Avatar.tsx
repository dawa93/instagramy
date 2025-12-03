import React from 'react';

interface Props {
  thumbnail?: string | null;
}

function Avatar({ thumbnail }: Props) {
  if (!thumbnail) {
    return <div>no thumbnail</div>;
  }

  return (
    <div
      className={`rounded-full w-9 h-9 bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]

      `}
    >
      <img
        className="rounded-full p-[0.1rem]"
        src={thumbnail}
        alt="user thumbnail"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

export default Avatar;
