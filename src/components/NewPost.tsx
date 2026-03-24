'use client';

import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { ChangeEvent, useRef, useState, type MouseEvent } from 'react';

import { AuthUser } from '../model/user';

import Button from './Button';
import PostUserAvatar from './PostUserAvatar';
import GridSpinner from './ui/GridSpinner';
import FilesIcon from './ui/icons/FilesIcon';

interface Props {
  user: AuthUser;
}

function NewPost({ user }: Props) {
  const { username, image } = user;
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const files = e.currentTarget?.files;

    if (files && files[0]) {
      setFile(files[0]);
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
    }
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts', { method: 'POST', body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }

        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
          {error}
        </p>
      )}

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
          ref={textRef}
        />

        <Button text="Publish" type="submit" onClick={handleSubmit} />
      </form>
    </section>
  );
}

export default NewPost;
