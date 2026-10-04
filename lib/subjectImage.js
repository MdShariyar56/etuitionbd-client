import accounting from "@/public/images/subjects/accounting.webp";
import biology from "@/public/images/subjects/biology.webp";
import chemistry from "@/public/images/subjects/chemistry.webp";
import fallback from "@/public/images/subjects/default.webp";
import ict from "@/public/images/subjects/ict.webp";
import language from "@/public/images/subjects/language.webp";
import math from "@/public/images/subjects/math.webp";
import physics from "@/public/images/subjects/physics.webp";
import science from "@/public/images/subjects/science.webp";

const rules = [
  [/math|algebra|geometry|calculus|statistic/i, math],
  [/physics/i, physics],
  [/chem/i, chemistry],
  [/bio/i, biology],
  [/ict|computer|program|coding|web/i, ict],
  [/account|finance|economic|business|commerce/i, accounting],
  [/science/i, science],
  [/english|bangla|bengali|literature|language|arabic|islam|social|history|geograph/i, language],
];

export function subjectImage(subject = "") {
  const hit = rules.find(([re]) => re.test(subject));
  return hit ? hit[1] : fallback;
}
