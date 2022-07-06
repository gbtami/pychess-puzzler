import { ServerData } from './types';
import { patch } from '@pychess/common/document';

import view from './view';

export function start(data: ServerData) {
    console.log(data);
    const element = document.querySelector('main') as HTMLElement;
    patch(element, view(data));
};
