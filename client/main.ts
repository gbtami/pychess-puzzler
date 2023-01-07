import { ServerData } from './puzzlerTypes';
import { patch } from './document';

import view from './puzzlerView';

export function start(data: ServerData) {
    console.log(data);
    const element = document.querySelector('main') as HTMLElement;
    patch(element, view(data));
};
