import React from 'react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-black italic uppercase mb-8 text-white">List Criteria</h1>
      <div className="prose prose-invert space-y-8 text-zinc-400">
        <section>
          <h2 className="text-2xl font-bold text-purple-400 uppercase tracking-tight">What is a Cinematic Level?</h2>
          <p>The Cinematic Levels List focuses on design philosophy over difficulty. We rank levels based on their atmosphere, storytelling, and visual direction.</p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-zinc-200 uppercase tracking-tight">Submission Rules</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Levels must have a clear visual theme.</li>
            <li>No "generic" glow style unless executed with unique art direction.</li>
            <li>Optimization matters—levels must be playable on standard systems.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
