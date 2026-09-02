"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Reveal, { revealItem } from "@/components/animations/Reveal";
import { skills } from "@/data/skills";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import GradientText from "@/components/ui/GradientText";
import useReducedMotion from "@/hooks/useReducedMotion";
import useDesktopMotion from "@/hooks/useDesktopMotion";

const fadeUp = revealItem();

// C major scale across two octaves, so adjacent cards ring out distinct marimba notes
const marimbaNotes = [
  261.63, 293.66, 329.63, 349.23, 392, 440, 493.88,
  523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77
];

type WindowWithWebKitAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

export default function Skills() {
  const [soundMuted, setSoundMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastToneAtRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const desktopMotionEnabled = useDesktopMotion();

  const handleCardPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!desktopMotionEnabled || shouldReduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--skill-spotlight-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--skill-spotlight-y", `${event.clientY - rect.top}px`);
  };

  const playSkillTune = useCallback(
    (skillIndex: number) => {
      if (soundMuted || typeof window === "undefined") return;

      const now = window.performance.now();
      if (now - lastToneAtRef.current < 90) return;
      lastToneAtRef.current = now;

      const AudioContextConstructor =
        window.AudioContext || (window as WindowWithWebKitAudio).webkitAudioContext;

      if (!AudioContextConstructor) return;

      const audioContext = audioContextRef.current ?? new AudioContextConstructor();
      audioContextRef.current = audioContext;

      if (audioContext.state === "suspended") {
        void audioContext.resume();
      }

      const frequency = marimbaNotes[skillIndex % marimbaNotes.length];
      const noteStart = audioContext.currentTime;

      // Marimba timbre: a sine fundamental plus a quiet 4th-partial sine
      // (bright overtone real marimba bars produce), struck with a fast
      // mallet attack and a short exponential decay.
      const fundamental = audioContext.createOscillator();
      const overtone = audioContext.createOscillator();
      const fundamentalGain = audioContext.createGain();
      const overtoneGain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      const masterGain = audioContext.createGain();

      fundamental.type = "sine";
      fundamental.frequency.setValueAtTime(frequency, noteStart);

      overtone.type = "sine";
      overtone.frequency.setValueAtTime(frequency * 3.98, noteStart);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3200, noteStart);
      filter.Q.setValueAtTime(0.7, noteStart);

      fundamentalGain.gain.setValueAtTime(1, noteStart);
      overtoneGain.gain.setValueAtTime(0.18, noteStart);

      masterGain.gain.setValueAtTime(0.0001, noteStart);
      masterGain.gain.exponentialRampToValueAtTime(0.22, noteStart + 0.006);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.62);

      fundamental.connect(fundamentalGain);
      overtone.connect(overtoneGain);
      fundamentalGain.connect(filter);
      overtoneGain.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(audioContext.destination);

      fundamental.start(noteStart);
      overtone.start(noteStart);
      fundamental.stop(noteStart + 0.65);
      overtone.stop(noteStart + 0.65);
      fundamental.onended = () => {
        fundamental.disconnect();
        overtone.disconnect();
        fundamentalGain.disconnect();
        overtoneGain.disconnect();
        filter.disconnect();
        masterGain.disconnect();
      };
    },
    [soundMuted]
  );

  useEffect(() => {
    return () => {
      void audioContextRef.current?.close();
    };
  }, []);

  return (
    <section className="skills-v2 relative overflow-hidden">
      <div className="section-shell">
        <Reveal stagger amount={0.2} className="mx-auto max-w-3xl text-center">
          <motion.div variants={fadeUp}>
            <Badge>Skills</Badge>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="skills-heading-row mt-5"
          >
            <h2 className="text-balance font-display text-[clamp(2.15rem,7vw,4.75rem)] font-black leading-[1.02] tracking-[-0.055em] text-white">
              <GradientText>Technologies I work with</GradientText>
            </h2>
            <button
              type="button"
              className="skills-sound-toggle"
              onClick={() => setSoundMuted((current) => !current)}
              aria-pressed={!soundMuted}
              aria-label={soundMuted ? "Unmute skill hover sounds" : "Mute skill hover sounds"}
              title={soundMuted ? "Unmute skill hover sounds" : "Mute skill hover sounds"}
            >
              {soundMuted ? <FaVolumeMute aria-hidden="true" /> : <FaVolumeUp aria-hidden="true" />}
              <span>{soundMuted ? "Sound Off" : "Sound On"}</span>
            </button>
          </motion.div>
          <motion.p variants={fadeUp} className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300">
            A practical full-stack toolkit grouped by how I use it across interfaces,
            APIs, databases, deployments, and day-to-day engineering workflow.
          </motion.p>
        </Reveal>

        <Reveal
          stagger
          amount={0.1}
          staggerDelay={0.02}
          className="mt-10 grid grid-cols-5 gap-x-2 gap-y-5 sm:gap-x-4"
        >
          {skills.map((skill, skillIndex) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                className="skill-card-v2__item"
              >
                <Card
                  as="article"
                  onPointerMove={handleCardPointerMove}
                  onPointerEnter={() => playSkillTune(skillIndex)}
                  className="skill-card-v2 group mx-auto flex max-w-[5rem] items-center justify-center p-2 sm:max-w-[5.5rem]"
                  style={{ "--skill-color": skill.color } as CSSProperties}
                  aria-label={skill.name}
                >
                  <div className="skill-card-v2__icon">
                    <Icon aria-hidden="true" />
                  </div>
                </Card>
                <span className="skill-card-v2__name">{skill.name}</span>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
