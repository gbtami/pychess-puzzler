import { h, VNode } from 'snabbdom'

import { VARIANTS } from './chess';

import { ServerData } from './puzzlerTypes';
import PuzzleController from './puzzlerCtrl';

function runGround(vnode: VNode, data: ServerData) {
    const el = vnode.elm as HTMLElement;
    new PuzzleController(el, data);
}

export default function(data: ServerData): VNode {
    const variant = VARIANTS[data.variant];
    const parts = data.fen.split(' ');
    const color = parts[1];
    const fullmove = parseInt(parts[parts.length - 1]);
    const ply = (fullmove -1) * 2 + ((color === "b") ? 1 : 0);
    const fen = parts.join('_').replace(/\+/g, '.');

    let gameUrl;
    if (data.gameId) {
        gameUrl = `${data.pychessURL}/${data.gameId}?ply=${ply}`;
    } else {
        gameUrl = `${data.pychessURL}/analysis/${data.variant}?fen=${fen}`;
    }

    window.history.replaceState({}, '', `/puzzle/${data._id}`);

    return h('main', [
        h('section.top', [
            h('form.variant', { props: {method: "post", action: '/variant'} }, [
                h('select#variant'),
            ]),
            h('form.all', { props: {method: "post", action: '/all'} }, [
                h('label', { attrs: { for: 'all' } }, 'All'),
                h('input#all'),
            ]),
            h('span.wrapper', [
                h('label', { attrs: { for: 'puzzlefile' } }, 'Upload puzzle file: '),
                h('input#puzzlefile'),
            ]),
            h('div#username', data.username),
            h('a', { attrs: {href: '/logout'} }, 'Log out'),
        ]),
        h('div.puzzle', [
            h('div.pocket-top', [
                h('div.' + variant.piece + '.' + data.variant, [
                    h('div.cg-wrap.pocket', [
                        h('div#pocket0'),
                    ]),
                ]),
            ]),
            h(`selection#mainboard.${variant.board}.${variant.piece}.${variant.boardMark}`, [
                h('div.cg-wrap.' + variant.cg, { hook: { insert: (vnode) => runGround(vnode, data) } }),
            ]),
            h('div.pocket-bot', [
                h('div.' + variant.piece + '.' + data.variant, [
                    h('div.cg-wrap.pocket', [
                        h('div#pocket1'),
                    ]),
                ]),
            ]),
            h('div.puzzle-ui', [
                h('div.puzzle-info', [
                    h('p.puzzle-info-title', `Candidate id: ${data._id}`),
                    h('p', ['Site: ',
                        ('site' in data) ? h('a.analyse', { attrs: { href: `${data.site}`, target: '_blank'} }, `${data.site}`) : '',
                    ]),
                    h('p', [
                        'From game: ',
                        h('a.analyse', { attrs: { href: gameUrl, target: '_blank'} }, ('gameId' in data) ? `${data.gameId}` : 'analysis'),
                    ]),
                    h('p', `Type: ${data.type}`),
                    h('p', `Eval: ${data.eval}`),
                    h('p.solution'),
                    h('p.moves'),
                ]),
                h('div.puzzle-review', [
                    h('button.reject'),
                    h('button.approve'),
                    h('button.append'),
                ]),
                h('div.puzzle-skip'),
                h('div.puzzle-help', [
                    h('p', "Does the puzzle feel a bit off, computer-like, or frustrating? Just reject it. Too difficult and you're not sure if interesting? Skip it. Use arrow keys to replay, backspace/enter to review, a to analyse.")
                ]),
            ])
        ]),
        h('div.replay', [
            h('button.prev'),
            h('button.next'),
        ]),
    ]);
}
