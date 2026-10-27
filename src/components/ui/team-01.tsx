"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import "./team-01.css";

function LinkedinIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M13.633 13.633h-2.37V9.92c0-.885-.017-2.025-1.234-2.025-1.235 0-1.424.965-1.424 1.96v3.778h-2.37V5.998H8.51v1.043h.031a2.5 2.5 0 0 1 2.246-1.233c2.403 0 2.846 1.58 2.846 3.637zM3.56 4.954a1.376 1.376 0 1 1 0-2.751 1.376 1.376 0 0 1 0 2.751m1.185 8.679H2.372V5.998h2.373zM14.815.001H1.18A1.17 1.17 0 0 0 0 1.154v13.691A1.17 1.17 0 0 0 1.18 16h13.635A1.17 1.17 0 0 0 16 14.845V1.153A1.17 1.17 0 0 0 14.815 0" /></svg>;
}

export interface TeamMember {
  name: string;
  role?: string;
  image?: string;
  socials?: { website?: string; linkedin?: string };
}

export default function Team01({ members }: { members: TeamMember[] }) {
  const reducedMotion = useReducedMotion();
  const reveal = { hidden: { y: reducedMotion ? 0 : 40, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  return <section className="ip-section creatox-team" aria-labelledby="creatox-team-heading">
    <motion.header className="creatox-team-heading" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={reveal} transition={{ duration: reducedMotion ? 0 : 0.8 }}>
      <Badge variant="outline" className="creatox-team-badge">Our team</Badge>
      <h2 id="creatox-team-heading">Meet the creative minds<br />behind <span>our success.</span></h2>
      <p>Different talents. A shared passion for creating brands that connect.</p>
    </motion.header>
    <div className="creatox-team-grid">
      {members.map((member, index) => <motion.article key={member.name} className="creatox-team-member" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={reveal} transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : (index % 4) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}>
        <div className="creatox-team-portrait">
          {member.image && <Image src={member.image} alt={member.name} fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" unoptimized />}
        </div>
        <div className="creatox-team-details">
          <h3>{member.name}</h3>
          {member.role && <p>{member.role}</p>}
          {member.socials && <div className="creatox-team-socials">
            {member.socials.website && <a href={member.socials.website} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s website`}><Globe size={16} aria-hidden="true" /></a>}
            {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}><LinkedinIcon /></a>}
          </div>}
        </div>
      </motion.article>)}
    </div>
  </section>;
}
