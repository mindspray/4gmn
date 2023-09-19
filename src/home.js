import './styles.css';
import { createElementFromBlueprint } from "./tools";

const text = {
  title: "Welcome to 4gmn, a to-do list app to help you not forget.",
};

/* 
  TEMPLATE:
  DOMElement_assetKey: {
    count: number of elements to produce
    classes: ["array", "of", "classes"]
    text: a string, an array of strings, or array of objects with string entries. 
    children: an object with any children.
  }
*/
const blueprint = {
  div_side: {
    ul_taskMenu: {
      li_taskInbox: {
        div_faSolid_faInbox: {},
        p_inboxText: {
          text: 'Inbox'
        }
      },
      li_taskToday: {
        div_faSolid_faCalendarDay: {},
        p_todayText: {
          text: 'Today'
        }
      },
      li_taskUpcoming: {
        div_faSolid_faCalendarDays: {},
        p_upcomingText: {
          text: 'Upcoming'
        }
      },
      li_taskFilters: {
        div_faSolid_faFilter: {},
        p_filterText: {
          text: 'Filters & Labels'
        }
      },
    },
    ul_projects: {
      p_projectsTitle: {
        text: 'Projects',
      },
      li_projHome: {
        text: 'Home'
      },
      li_projWork: {
        text: 'Work'
      }
    }
  },
  div_main: {
    div_hero: {
      div_heroLeft: {
        h1_title: {
          text: text.title
        },
        p_tagline: {
          text: text.tagline
        },
        p_intro: {
          text: text.intro
        }
      },
      div_heroRight: {
        img_heroImg: {
          src: './images/hero-splash.png'
        } 
      } 
    }
  },
}

let homePage;

const loadHome = function () {
  const content = document.getElementById('content');
  const existingContainer = document.querySelector('.container');
  
  const buildPage = () => createElementFromBlueprint(blueprint);

  if (!homePage){
    homePage = buildPage();
  }

  if (!existingContainer){
    content.append(homePage);
  } else {
    content.removeChild(existingContainer);
    content.append(homePage);
  }
};

export { loadHome };