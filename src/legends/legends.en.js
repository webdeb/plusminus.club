import * as images from "./images";

export const legends = [
  {
    name: "Benjamin Franklin",
    dateOfBirth: "January 17, 1706",
    dateOfDeath: "April 17, 1790",
    shortDescription:
      "Benjamin Franklin was an American polymath who excelled in various fields including science, politics, writing, and diplomacy. He is best known for his experiments with electricity and his discovery of the lightning rod, as well as his significant contributions to the field of physics. Franklin's work in electricity laid the groundwork for our understanding of electrical phenomena and the development of practical applications.",
    imageURL: "/legends/benjamin-franklin_2404x2971.jpg",
    image: images.benjamin_img,
    id: "benjamin-franklin",
  },
  {
    name: "Isaac Newton",
    dateOfBirth: "January 4, 1643",
    dateOfDeath: "March 31, 1727",
    shortDescription:
      "Isaac Newton was an English mathematician, physicist, and astronomer who is widely recognized as one of the most influential scientists in history. He formulated the laws of motion and universal gravitation, laying the foundation for classical mechanics. Newton's groundbreaking work, including his book 'Philosophiæ Naturalis Principia Mathematica,' revolutionized our understanding of the physical world and established him as a key figure in the scientific revolution.",
    imageURL: "/legends/newton_375x455.jpg",
    image: images.newton_img,
    id: "isaac-newton",
  },
  {
    name: "William Thomson, 1st Baron Kelvin",
    dateOfBirth: "June 26, 1824",
    dateOfDeath: "December 17, 1907",
    shortDescription:
      "William Thomson, 1st Baron Kelvin, was a Scottish physicist and engineer who made significant contributions to the fields of thermodynamics and electromagnetism. He is best known for introducing the Kelvin scale of absolute temperature and his work on the theory of heat. Kelvin also played a crucial role in the laying of the first transatlantic telegraph cable, which revolutionized global communication. His contributions to science and engineering had a profound impact on the advancement of technology and our understanding of the physical world.",
    imageURL: "/legends/kelvin_311x406.jpg",
    image: images.kelvin_img,
    id: "william-thomson-kelvin",
  },
  {
    name: "Charles-Augustin de Coulomb",
    dateOfBirth: "June 14, 1736",
    dateOfDeath: "August 23, 1806",
    shortDescription:
      "Charles-Augustin de Coulomb was a French physicist and engineer who made significant contributions to the fields of electromagnetism and mechanics. He is best known for his discovery of Coulomb's law, which describes the electrostatic interaction between electrically charged particles. Coulomb's work laid the foundation for the development of the theory of electromagnetism and had a profound impact on the field of physics.",
    imageURL: "/legends/coulomb_800x1034.png",
    image: images.coulomb_img,
    id: "charles-augustin-de-coulomb",
  },
  {
    name: "Alessandro Volta",
    dateOfBirth: "February 18, 1745",
    dateOfDeath: "March 5, 1827",
    shortDescription:
      "Alessandro Volta was an Italian physicist who invented the battery, known as the Voltaic pile. His work in electricity and electromagnetism laid the foundation for the development of modern electrical power systems.",
    imageURL: "/legends/volta_390x480.jpg",
    image: images.volta_img,
    id: "alessandro-volta",
  },
  {
    name: "Georg Simon Ohm",
    dateOfBirth: "March 16, 1789",
    dateOfDeath: "July 6, 1854",
    shortDescription:
      "Georg Simon Ohm was a German physicist who formulated Ohm's Law, which describes the relationship between current, voltage, and resistance in an electrical circuit. His work significantly contributed to the understanding of electric current.",
    imageURL: "/legends/ohm_337x428.jpg",
    image: images.ohm_img,
    id: "georg-simon-ohm",
  },
  {
    name: "Michael Faraday",
    dateOfBirth: "September 22, 1791",
    dateOfDeath: "August 25, 1867",
    shortDescription:
      "Michael Faraday was a British scientist who made significant contributions to the fields of electromagnetism and electrochemistry. He discovered electromagnetic induction and electrolysis, laying the foundation for the development of electric motors and generators.",
    imageURL: "/legends/faraday_2374x3000.jpg",
    image: images.faraday_img,
    id: "michael-faraday",
  },
  {
    name: "James Prescott Joule",
    dateOfBirth: "December 24, 1818",
    dateOfDeath: "October 11, 1889",
    shortDescription:
      "James Prescott Joule was an English physicist and brewer who made significant contributions to the study of thermodynamics and the concept of energy conservation. He is best known for his experiments that established the relationship between mechanical work and heat, now known as the Joule's law. Joule's work laid the foundation for the theory of conservation of energy and helped establish the field of thermodynamics.",
    imageURL: "/legends/joule_330x395.jpg",
    image: images.joule_img,
    id: "james-prescott-joule",
  },
  {
    name: "James Clerk Maxwell",
    dateOfBirth: "June 13, 1831",
    dateOfDeath: "November 5, 1879",
    shortDescription:
      "James Clerk Maxwell was a Scottish physicist who formulated the classical theory of electromagnetism, known as Maxwell's equations. His work united electricity, magnetism, and light, and his discoveries paved the way for the development of modern physics.",
    imageURL: "/legends/maxwell_230x288.jpg",
    image: images.maxwell_img,
    id: "james-clerk-maxwell",
  },
  {
    name: "Nikola Tesla",
    dateOfBirth: "July 10, 1856",
    dateOfDeath: "January 7, 1943",
    shortDescription:
      "Nikola Tesla was a Serbian-American inventor, electrical engineer, and physicist. He made numerous groundbreaking contributions to the field of electrical engineering, including the development of alternating current (AC) systems and the invention of the induction motor.",
    imageURL: "/legends/tesla_274x367.jpg",
    image: images.tesla_img,
    id: "nikola-tesla",
  },
  {
    name: "Heinrich Hertz",
    dateOfBirth: "February 22, 1857",
    dateOfDeath: "January 1, 1894",
    shortDescription:
      "Heinrich Hertz was a German physicist who made groundbreaking contributions to the field of electromagnetism. He is best known for his experiments that proved the existence of electromagnetic waves, which paved the way for the development of wireless communication technologies. Hertz's work laid the foundation for the later development of radio, television, and radar systems.",
    image: images.hertz_img,
  },
  {
    name: "André-Marie Ampère",
    dateOfBirth: "January 20, 1775",
    dateOfDeath: "June 10, 1836",
    shortDescription:
      "André-Marie Ampère was a French physicist and mathematician known for his significant contributions to the field of electromagnetism. He formulated Ampère's Law, which describes the relationship between electric currents and the resulting magnetic fields. Ampère's groundbreaking work laid the foundation for the development of electrodynamics, the study of the interaction between electric currents and magnetic fields.",
    image: images.ampere_img,
    id: "andre-marie-ampere",
  },
];

export const legendsMap = legends.reduce(
  (map, legend, idx) => ({ ...map, [legend.id]: legend }),
  {}
);
