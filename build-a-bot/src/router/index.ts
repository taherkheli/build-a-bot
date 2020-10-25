import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '@/home/HomePage.vue';
import RobotBuilder from '@/build/RobotBuilder.vue';
import PartInfo from '@/parts/PartInfo.vue';
import BrowseParts from '@/parts/BrowseParts.vue';
import RobotHeads from '@/parts/RobotHeads.vue';
import RobotTorsos from '@/parts/RobotTorsos.vue';
import RobotArms from '@/parts/RobotArms.vue';
import RobotBases from '@/parts/RobotBases.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/build',
    name: 'Build',
    component: RobotBuilder,
  },
  {
    path: '/parts/browse',
    name: 'BrowseParts',
    component: BrowseParts,
    children: [
      {
        path: '/heads',
        name: 'BrowseHeads',
        component: RobotHeads,
      },
      {
        path: '/torsos',
        name: 'BrowseTorsos',
        component: RobotTorsos,
      },
      {
        path: '/arms',
        name: 'BrowseArms',
        component: RobotArms,
      },
      {
        path: '/bases',
        name: 'BrowseBases',
        component: RobotBases,
      },
    ],
  },
  {
    path: '/parts/:partType/:id',
    name: 'Parts',
    component: PartInfo,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
