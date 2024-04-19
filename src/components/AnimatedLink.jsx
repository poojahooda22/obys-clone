import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState } from 'react';


export default function AnimatedLink({title}) {
    const [isHovered, setisHovered] = useState(false);
  return (
    <motion.div 
    onMouseEnter={() => setisHovered(true)}
    onMouseLeave={() => setisHovered(false)}
        className="cursor-pointer relative overflow-hidden"
    >
        <AnimatedWord title={title} animation={letterAnimation} isHovered={isHovered} />
        <div className='absolute top-0'>
            <AnimatedWord title={title} animation={letterAnimationTwo} isHovered={isHovered} />
        </div>
        
    </motion.div>
  )
}

const titleAnimation = {
    rest: {
        transition: {
            staggerChildren: 0.035,
        }
    },
    hover: {
        transition: {
            staggerChildren: 0.035,
        }
    }
}

const letterAnimation = {
    rest: {
        y: 0,
    },
    hover: {
        y: -45,
        transition: {
            duration: 0.35,
            ease: [.3,.86,.36,.95],
            type: "spring",
            stiffness: 100
        },
    },
}


const letterAnimationTwo = {
    rest: {
        y: 45,
    },
    hover: {
        y: 0,
        transition: {
            duration: 0.35,
            ease: [.3,.86,.36,.95],
            type: "spring",
            stiffness: 100
        },
    },
}


AnimatedLink.propTypes = {
    title: PropTypes.string.isRequired,  
};

const AnimatedWord = ({title, animation, isHovered}) => {
    return (
        <motion.span 
            variants={titleAnimation}
            initial="rest"
            animate={isHovered ? "hover" : "rest"}
            className="relative whitespace-nowrap">
            {title.split("").map((character, i) => 
                character === " " ? (
                    <span  key={i}> &nbsp;</span> 
                ) : (
                    <motion.span key={i}
                    variants={animation}
                        className="relative inline-block whitespace-nowrap"
                    >
                        {character}
                    </motion.span>
                )
        )}
        </motion.span>
    )
} 

AnimatedWord.propTypes = {
    title: PropTypes.string.isRequired,
    animation: PropTypes.object.isRequired,
    isHovered: PropTypes.bool.isRequired,  
};