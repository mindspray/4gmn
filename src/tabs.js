import { createElementFromBlueprint } from "./tools";
import './nav-styles.css';
// const text = {
//   "links": ['INDEX', 'MENU', 'CONTACT']
// }

/* 
  TEMPLATE:
  DOMElement_textKey: {
    count: number of elements to produce
    classes: ["array", "of", "classes"]
    text: a string, an array of strings, or array of objects with string entries.
    children: { Another DOM Template }
  }
*/
const blueprint = {
  nav_navBar: {
      div_leftControls: {
        div_menu: {
          div_faSolid_faBars: {}
        },
        div_home: {
          div_faSolid_faHouse: {}
        },
        div_search: {
          div_faSolid_faMagnifyingGlass: {}
        },
      },
      div_centerControls: {
        text: '🌸 4gmn'
      },
      div_rightControls: {
        div_newTask: {
          text: '[ + ]'
        },
        div_profile: {
          div_faSolid_faUser: {}
        },
      },
      // ul_navigation: {
      //   li_item: {
      //     count: 3,
      //     a_links: {
      //       // text: text.links,
      //       ids: [
      //         'home-tab',
      //         'menu-tab',
      //         'contact-tab'],
      //       href: ['#']
      //     }
      //   }
      // }
  }
}

const createTabNav = function(){
  const content = document.getElementById('content');

  const buildPage = function(){
    const navBar = createElementFromBlueprint(blueprint,{ containerType: 'header'});

    return navBar;
  }

  const header = buildPage();
  content.append(header);
}

export { createTabNav }