const tagCategories = {
  "annotation-main": ["Na", "Nb", "Nc", "Ncd", "Nd", "Nh", "Nv", "VA", "VAC", "VB", "VC", "VCL", "VD", "VF", "VE", "VG", "VH", "VHC", "VI", "VJ", "VK", "VL", "V_2", "FW"],
  "annotation-modifier": ["A", "D", "Da", "Dfa", "Dfb", "Di", "Dk", "DM", "Neqa", "Neqb", "Nes", "Neu", "I"],
  "annotation-connector": ["Caa", "Cab", "Cba", "Cbb", "P", "T", "DE", "SHI", "COLONCATEGORY", "COMMACATEGORY", "DASHCATEGORY", "DOTCATEGORY", "ETCCATEGORY", "EXCLAMATIONCATEGORY", "PARENTHESISCATEGORY", "PAUSECATEGORY", "PERIODCATEGORY", "QUESTIONCATEGORY", "SEMICOLONCATEGORY", "SPCHANGECATEGORY", "WHITESPACE"]
};
// const tagCategories = {
//   "annotation-main": ["Na", "Nb", "Nc", "Ncd", "Nd", "Nh", "Nv"],
//   "annotation-modifier": ["A", "D", "Da", "Dfa", "Dfb", "Di", "Dk", "DM", "Neqa", "Neqb", "Nes", "Neu"],
//   "annotation-connector": ["Caa", "Cab", "Cba", "Cbb", "P", "T", "DE", "SHI"],
//   "punctuation": ["COLONCATEGORY", "COMMACATEGORY", "DASHCATEGORY", "DOTCATEGORY", "ETCCATEGORY", "EXCLAMATIONCATEGORY", "PARENTHESISCATEGORY", "PAUSECATEGORY", "PERIODCATEGORY", "QUESTIONCATEGORY", "SEMICOLONCATEGORY", "SPCHANGECATEGORY", "WHITESPACE"],
//   "annotation-action": ["VA", "VAC", "VB", "VC", "VCL", "VD", "VF", "VE", "VG", "VH", "VHC", "VI", "VJ", "VK", "VL", "V_2"],
//   "annotation-foreign": ["FW"],
//   "annotation-interjection": ["I"]
// }

export const classifyTag = (tag) => {
  for (const [category, tags] of Object.entries(tagCategories)) {
    if (tags.includes(tag)) {
      return category;
    }
  }
  return "unknown";
};
