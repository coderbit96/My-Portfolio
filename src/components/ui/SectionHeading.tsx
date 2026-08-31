import Reveal from "@/components/animations/Reveal";
import TextReveal from "@/components/animations/TextReveal";
import Badge from "@/components/ui/Badge";
import GradientText from "@/components/ui/GradientText";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal amount={0.35} className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
      <Badge className="mb-5">
        <TextReveal text={eyebrow} mode="scramble" />
      </Badge>
      <h2 className="text-balance font-display text-[clamp(1.9rem,6vw,3.4rem)] font-black leading-[1.03] tracking-[-0.04em] text-white">
        <GradientText>
          <TextReveal text={title} mode="words" />
        </GradientText>
      </h2>
      {description ? <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">{description}</p> : null}
    </Reveal>
  );
}
