export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'devices',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Devices', // menu title
            icon: 'ion-android-settings', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'groups',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Groups', // menu title
            icon: 'ion-link', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'scenes',  // path for our page
        data: { // custom menu declaration
          menu: {
            title: 'Scenes', // menu title
            icon: 'ion-ios-film-outline', // menu icon
            pathMatch: 'prefix', // use it if item children not displayed in menu
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'Dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
    ]
  }
];
