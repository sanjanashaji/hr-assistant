import { motion } from "framer-motion";
import {
  FaUsers,
  FaBuilding,
  FaBriefcase,
  FaUserTie
} from "react-icons/fa";

const icons = [
  FaUsers,
  FaBuilding,
  FaBriefcase,
  FaUserTie
];

function FloatingIcons() {
  return (
    <>
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-cyan-400 opacity-20"
          style={{
            top: `${20 + index * 15}%`,
            left: `${10 + index * 20}%`
          }}
          animate={{
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity
          }}
        >
          <Icon size={50} />
        </motion.div>
      ))}
    </>
  );
}

export default FloatingIcons;