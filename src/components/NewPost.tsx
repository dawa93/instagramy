'use client';

import Image from 'next/image';
import { AuthUser } from '../model/user';
import Button from './Button';
import PostUserAvatar from './PostUserAvatar';
import FilesIcon from './ui/icons/FilesIcon';
import { ChangeEvent, DragEventHandler, useState } from 'react';

interface Props {
  user: AuthUser;
}

function NewPost({ user }: Props) {
  const { username, image } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.currentTarget?.files;

    if (files && files[0]) {
      setFile(files[0]);
      console.log('files[0]', files[0]);
    }
  };

  const handleDrag: React.DragEventHandler<HTMLLabelElement> = (e) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    }
    if (e.type === 'dragleave') {
      setDragging(false);
    }
  };

  const handleDragOver: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
  };

  const handleDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;

    if (files && files[0]) {
      setFile(files[0]);
      console.log('files[0]', files[0]);
    }
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      <PostUserAvatar username={username} userImage={image ?? ''} />

      <form className="w-full flex flex-col mt-2">
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          onChange={handleChange}
          accept="image/*"
        />
        <label
          htmlFor="input-upload"
          className={`w-full h-60 flex flex-col items-center justify-center ${!file && 'border-sky-500 border-dash'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}

          {!file && (
            <div className="flex flex-col items-center pointer-events-none ">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}

          {file && (
            <div className="relative w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes={'650px'}
              />
            </div>
          )}
        </label>

        <textarea
          className="outline-none text-lg border border-neutral-300"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder="Write a caption"
        />

        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}

export default NewPost;
