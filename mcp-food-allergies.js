// מערכת MCP לתחלופת אלרגנים במנות
// Model Context Protocol לניהול מנות ואלרגנים

// מאגר אלרגנים נפוצים וחלופות מומלצות
const allergensDatabase = {
  // אלרגנים מבוססי חלבון
  "חלב פרה": {
    category: "חלב",
    alternatives: ["חלב שקדים", "חלב סויה", "חלב קוקוס", "חלב שיבולת שועל", "חלב אורז"],
    proteinContent: "גבוה",
    notes: "חלב קוקוס עשיר יותר בשומן ומתאים יותר למנות מתוקות וקרמיות"
  },
  "גבינה": {
    category: "חלב",
    alternatives: ["גבינת סויה", "גבינת קשיו", "גבינת שקדים", "גבינת קוקוס"],
    proteinContent: "גבוה",
    notes: "גבינות קשיו וסויה טובות למרקמים דומים לגבינות רכות"
  },
  "יוגורט": {
    category: "חלב",
    alternatives: ["יוגורט סויה", "יוגורט קוקוס", "יוגורט שקדים"],
    proteinContent: "בינוני",
    notes: "יוגורט קוקוס מתאים למנות מתוקות, יוגורט סויה מתאים יותר למנות מלוחות"
  },
  
  // אלרגנים מבוססי גלוטן
  "קמח חיטה": {
    category: "גלוטן",
    alternatives: ["קמח אורז", "קמח תירס", "קמח כוסמת", "קמח קוקוס", "קמח שקדים", "קמח טפיוקה"],
    proteinContent: "בינוני",
    notes: "לאפייה מומלץ לשלב מספר קמחים ללא גלוטן"
  },
  "פסטה": {
    category: "גלוטן",
    alternatives: ["פסטה אורז", "פסטה תירס", "פסטה עדשים", "פסטה קינואה", "אטריות זכוכית"],
    proteinContent: "בינוני",
    notes: "פסטת עדשים וקינואה מספקות יותר חלבון מפסטת אורז או תירס"
  },
  "קוסקוס": {
    category: "גלוטן",
    alternatives: ["קינואה", "כוסמת", "אורז", "תירס"],
    proteinContent: "בינוני",
    notes: "קינואה היא חלופה טובה מבחינת מרקם וערך תזונתי"
  },
  
  // אלרגנים מבוססי אגוזים
  "בוטנים": {
    category: "אגוזים",
    alternatives: ["זרעי חמנייה", "זרעי דלעת", "טחינה", "אבוקדו"],
    proteinContent: "גבוה",
    notes: "מי שאלרגי לבוטנים לא בהכרח אלרגי לאגוזי עץ ולהפך"
  },
  "שקדים": {
    category: "אגוזים",
    alternatives: ["זרעי חמנייה", "זרעי דלעת", "זרעי פשתן", "שיבולת שועל"],
    proteinContent: "גבוה",
    notes: "שיבולת שועל טחונה יכולה להיות חלופה טובה למרקם של אבקת שקדים באפייה"
  },
  
  // אלרגנים מבוססי סויה
  "סויה": {
    category: "קטניות",
    alternatives: ["חומוס", "עדשים", "שעועית", "טופו עשוי מחומוס"],
    proteinContent: "גבוה",
    notes: "טופו עשוי מחומוס (בופו) הוא חלופה טובה לטופו רגיל עבור אלרגיים לסויה"
  },
  
  // אלרגנים מבוססי ביצים
  "ביצים": {
    category: "ביצים",
    alternatives: ["תחליף ביצה מסחרי", "זרעי פשתן טחונים + מים", "מחית בננה", "טחינה + מים", "רסק תפוחים", "אקווה פאבה (מי חומוס)"],
    proteinContent: "גבוה",
    notes: "לאפייה: רבע כוס רסק תפוחים או מחית בננה = ביצה אחת; לקישור: כף זרעי פשתן + 3 כפות מים = ביצה אחת"
  }
};

// מאגר מנות נפוצות והאלרגנים שהן מכילות
const dishesDatabase = {
  "פנקייק": {
    ingredients: ["קמח חיטה", "ביצים", "חלב פרה"],
    category: "מאפים",
    difficulty: "קלה"
  },
  "פסטה אלפרדו": {
    ingredients: ["פסטה", "חלב פרה", "גבינה"],
    category: "מנה עיקרית",
    difficulty: "בינונית"
  },
  "עוגת שוקולד": {
    ingredients: ["קמח חיטה", "ביצים", "חלב פרה"],
    category: "קינוחים",
    difficulty: "בינונית"
  },
  "פלאפל": {
    ingredients: ["חומוס", "בוטנים"],
    category: "מנה עיקרית",
    difficulty: "בינונית",
    notes: "לעתים מכיל בוטנים או טחינה - תלוי במתכון"
  },
  "מוסלי": {
    ingredients: ["שיבולת שועל", "חלב פרה", "שקדים", "אגוזים"],
    category: "ארוחת בוקר",
    difficulty: "קלה"
  },
  "חביתה": {
    ingredients: ["ביצים"],
    category: "ארוחת בוקר",
    difficulty: "קלה"
  },
  "חומוס": {
    ingredients: ["חומוס", "טחינה"],
    category: "מנה ראשונה",
    difficulty: "בינונית"
  },
  "בורקס גבינה": {
    ingredients: ["קמח חיטה", "גבינה"],
    category: "מאפים",
    difficulty: "בינונית"
  },
  "פיצה": {
    ingredients: ["קמח חיטה", "גבינה"],
    category: "מנה עיקרית",
    difficulty: "בינונית"
  },
  "קוסקוס": {
    ingredients: ["קוסקוס"],
    category: "מנה עיקרית",
    difficulty: "בינונית"
  }
};

// פונקציה המחזירה רשימת אלרגנים ממנה מסוימת
function getAllergensFromDish(dishName) {
  const dish = dishesDatabase[dishName];
  if (!dish) {
    return { success: false, message: `המנה ${dishName} לא נמצאה במאגר` };
  }
  
  return {
    success: true,
    dishName: dishName,
    allergens: dish.ingredients,
    category: dish.category,
    difficulty: dish.difficulty
  };
}

// פונקציה המציעה חלופות לאלרגן מסוים
function getAllergenAlternatives(allergen) {
  const allergenInfo = allergensDatabase[allergen];
  if (!allergenInfo) {
    return { success: false, message: `האלרגן ${allergen} לא נמצא במאגר` };
  }
  
  return {
    success: true,
    allergen: allergen,
    category: allergenInfo.category,
    alternatives: allergenInfo.alternatives,
    notes: allergenInfo.notes
  };
}

// פונקציה המציעה גרסה מותאמת של מנה ללא אלרגנים מסוימים
function getSafeRecipeAlternative(dishName, allergies) {
  const dish = dishesDatabase[dishName];
  if (!dish) {
    return { success: false, message: `המנה ${dishName} לא נמצאה במאגר` };
  }
  
  const problematicIngredients = dish.ingredients.filter(ingredient => 
    allergies.some(allergy => 
      allergy === ingredient || 
      (allergensDatabase[ingredient] && allergensDatabase[ingredient].category === allergy)
    )
  );
  
  if (problematicIngredients.length === 0) {
    return { 
      success: true, 
      dishName: dishName,
      message: `המנה ${dishName} בטוחה לאכילה עבור האלרגיות שצוינו`,
      safeToEat: true
    };
  }
  
  const alternatives = {};
  let allAlternativesFound = true;
  
  problematicIngredients.forEach(ingredient => {
    if (allergensDatabase[ingredient]) {
      alternatives[ingredient] = allergensDatabase[ingredient].alternatives;
    } else {
      allAlternativesFound = false;
      alternatives[ingredient] = ["לא נמצאו חלופות"];
    }
  });
  
  return {
    success: true,
    dishName: dishName,
    safeToEat: false,
    problematicIngredients: problematicIngredients,
    alternatives: alternatives,
    allAlternativesFound: allAlternativesFound,
    message: allAlternativesFound ? 
      `נמצאו חלופות לכל המרכיבים הבעייתיים ב${dishName}` : 
      `לא נמצאו חלופות לחלק מהמרכיבים הבעייתיים ב${dishName}`
  };
}

// פונקציה המציעה מנות בטוחות על סמך רשימת אלרגיות
function getSafeDishSuggestions(allergies) {
  const safeDishes = [];
  const potentiallyAdaptableDishes = [];
  
  for (const [dishName, dishInfo] of Object.entries(dishesDatabase)) {
    const problematicIngredients = dishInfo.ingredients.filter(ingredient => 
      allergies.some(allergy => 
        allergy === ingredient || 
        (allergensDatabase[ingredient] && allergensDatabase[ingredient].category === allergy)
      )
    );
    
    if (problematicIngredients.length === 0) {
      safeDishes.push({
        dishName: dishName,
        category: dishInfo.category,
        difficulty: dishInfo.difficulty
      });
    } else {
      // בדיקה אם יש חלופות לכל המרכיבים הבעייתיים
      let allAlternativesFound = true;
      
      for (const ingredient of problematicIngredients) {
        if (!allergensDatabase[ingredient] || !allergensDatabase[ingredient].alternatives || allergensDatabase[ingredient].alternatives.length === 0) {
          allAlternativesFound = false;
          break;
        }
      }
      
      if (allAlternativesFound) {
        potentiallyAdaptableDishes.push({
          dishName: dishName,
          category: dishInfo.category,
          difficulty: dishInfo.difficulty,
          problematicIngredients: problematicIngredients
        });
      }
    }
  }
  
  return {
    success: true,
    allergies: allergies,
    safeDishes: safeDishes,
    potentiallyAdaptableDishes: potentiallyAdaptableDishes
  };
}

// הדגמת שימוש במערכת ה-MCP לאלרגנים
function demonstrateMCPUsage() {
  // דוגמה 1: קבלת מידע על אלרגנים במנה
  console.log("דוגמה 1: אלרגנים בפנקייק");
  console.log(getAllergensFromDish("פנקייק"));
  console.log("\n");
  
  // דוגמה 2: קבלת חלופות לאלרגן ספציפי
  console.log("דוגמה 2: חלופות לחלב פרה");
  console.log(getAllergenAlternatives("חלב פרה"));
  console.log("\n");
  
  // דוגמה 3: התאמת מנה לפי אלרגיות
  console.log("דוגמה 3: התאמת פנקייק לאלרגי חלב");
  console.log(getSafeRecipeAlternative("פנקייק", ["חלב"]));
  console.log("\n");
  
  // דוגמה 4: המלצת מנות בטוחות על סמך אלרגיות
  console.log("דוגמה 4: מנות מומלצות לאלרגי גלוטן ואגוזים");
  console.log(getSafeDishSuggestions(["גלוטן", "אגוזים"]));
}

// הפעלת הדגמה
// demonstrateMCPUsage();

// ייצוא הפונקציות לשימוש חיצוני
module.exports = {
  getAllergensFromDish,
  getAllergenAlternatives,
  getSafeRecipeAlternative,
  getSafeDishSuggestions,
  allergensDatabase,
  dishesDatabase
};
