import { h, VNode } from 'snabbdom'
import * as Mousetrap  from 'mousetrap';
import * as cg from 'chessgroundx/types';

import { patch, changePieceCSS } from '@pychess/common/document';
import { GameController } from '@pychess/common/gameCtrl';
import { PyChessModel } from '@pychess/common/types';
import { UCIMove, cg2uci, uci2LastMove, selectVariant } from '@pychess/common/chess';

import { randomId, Puzzle, ServerData } from './types';

export default class PuzzleController extends GameController {
    username: string;
    _id: string;
    solutionEl: VNode | HTMLElement;
    solution: UCIMove[];
    solutionSan: string[];
    movesEl: VNode | HTMLElement;
    moves: UCIMove[] = [];
    movesSan: string[] = [];

    constructor(el: HTMLElement, data: ServerData) {
        const model = {
            home: data.home,
            assetURL: data.assetURL,
            username: data.username,
            variant: data.variant,
            fen: data.fen,
            ply: data.ply,
            gameId: data.gameId,
        } as PyChessModel;

        super(el, model);

        this.username = data.username;
        this.solution = data.moves.split(',') as UCIMove[];
        this.moves = [];
        this._id = data._id;

        if (!data.ply) {
            const parts = data.fen.split(' ');
            const color = parts[1];
            const fullmove = parseInt(parts[parts.length - 1]);
            this.ply = (fullmove -1) * 2 + ((color === "b") ? 1 : 0);
        }

        this.chessground.set({
            animation: { enabled: true },
            orientation: this.turnColor,
            turnColor: this.turnColor,
            movable: {
                free: false,
                color: this.turnColor,
                showDests: this.showDests,
                events: {
                    after: (orig, dest, meta) => this.onUserMove(orig, dest, meta),
                    afterNewPiece: (role, dest, meta) => this.onUserDrop(role, dest, meta),
                }
            },
            events: {
                move: this.onMove(),
                dropNewPiece: this.onDrop(),
                select: this.onSelect(),
            },
        });

        changePieceCSS(model.assetURL, 'shogi', 'porti');
        changePieceCSS(model.assetURL, 'tori', 'porti');
        changePieceCSS(model.assetURL, 'kyoto', 'kyotoi');
        changePieceCSS(model.assetURL, 'xiangqi', 'xiangqi2di');
        changePieceCSS(model.assetURL, 'janggi', 'janggiikaw');

        const vVariant = this.variant.name || "chess";
        const variantEl = document.getElementById('variant') as HTMLElement;
        patch(variantEl, selectVariant("variant", vVariant, () => this.setVariant(true), () => this.setVariant(false)));

        const fileEl = document.getElementById('puzzlefile') as HTMLElement;
        patch(fileEl, h('input#puzzlefile', {
            props: { name: 'puzzlefile', type: 'file', accept: '.epd' },
            on: { change: () => this.readFile() },
            }
        ));

        this.movesEl = document.querySelector('.moves') as HTMLElement;
        
        const approveEl = document.querySelector('.approve') as HTMLElement;
        patch(approveEl, h('button.approve', { on: { click: () => this.review(true) } },[
                h('em', 'Approve'),
                h('strong', '✓'),
                h('em', '[enter]'),
            ]));

        const rejectEl = document.querySelector('.reject') as HTMLElement;
        patch(rejectEl, h('button.reject', { on: { click: () => this.review(false) } },[
                h('em', 'Reject'),
                h('strong', '✗'),
                h('em', '[backspace]'),
            ]));

        const appendEl = document.querySelector('.append') as HTMLElement;
        patch(appendEl, h('button.append', { attrs: { disabled: true }, on: { click: () => this.append() } },[
                h('em', 'solution'),
                h('strong', '↑'),
                h('em', 'my moves'),
            ]));

        const skipEl = document.querySelector('.puzzle-skip') as HTMLElement;
        patch(skipEl, h('div.puzzle-skip', [h('button', { on: { click: () => this.skip() } }, 'Skip')]));

        const forwardEl = document.querySelector('.next') as HTMLElement;
        patch(forwardEl, h('button.next', { on: { click: () => this.forward() } }, 'Forward >'));

        const rewindEl = document.querySelector('.prev') as HTMLElement;
        patch(rewindEl, h('button.prev', {
            attrs: { disabled: true },
            class: { variation: false },
            on: { click: () => this.rewind() }
            },
            '< Rewind')
        );

        this.createSolutionSan();

        const noRepeat = (f: () => void) => (e: KeyboardEvent) => { if (!e.repeat) f() };

        Mousetrap.bind('left', noRepeat(() => this.rewind()));
        Mousetrap.bind('right', noRepeat(() => this.forward()));
        Mousetrap.bind('backspace', noRepeat(() => this.review(false)));
        Mousetrap.bind('enter', noRepeat(() => this.review(true)));
        Mousetrap.bind('a', () => (document.querySelector('a.analyse') as HTMLAnchorElement).click());
    }

    createSolutionSan = () => {
        if (this.ffishBoard === undefined) {
            console.log('updateSolution() WAIT 100...');
            // At very first time we may have to wait for ffish module to initialize
            setTimeout(this.createSolutionSan, 100);
        } else {
            this.solutionSan = this.ffishBoard.variationSan(this.solution.join(' '), this.notationAsObject, false).split(' ');
            console.log('updateSolution() solutionSan=', this.solutionSan);

            this.solutionEl = document.querySelector('.solution') as HTMLElement;
            if (this.solution) {
                this.updateSolution();
            };
        }
    }

    setVariant (isInput: boolean) {
        const e = document.getElementById('variant') as HTMLSelectElement;
        const variant = e.options[e.selectedIndex].value;

        const p = document.querySelector('.variant') as HTMLFormElement;
        console.log("Selected varient is:", variant, isInput);
        p.submit();
    }

    updateGui(move: UCIMove) {
        this.chessground.set(this.cgConfig(move));
        this.setDests();

        const rewindEl = document.querySelector('.prev') as HTMLInputElement;
        rewindEl.classList.toggle('variation', this.isInVariation());
        rewindEl.disabled = this.moves.length === 0;

        const forwardEl = document.querySelector('.next') as HTMLInputElement;
        forwardEl.disabled = !this.canForward();

        const appendEl = document.querySelector('.append') as HTMLInputElement;
        appendEl.disabled = !this.canAppend();

        this.updateSolution();
    }

    updateSolution = () =>  {
        this.solutionEl = patch(this.solutionEl, h('p.solution', [
            'Solution: ',
            ...this.solutionSan.map((san, i) =>
              h('san', {
                class: { done: this.moves[i] === this.solution[i] }
              }, san)
            )
        ]));

        this.movesEl = patch(this.movesEl, h('p.moves', [
            'My moves: ',
            ...this.movesSan.map((move, i) =>
              h('uci', {
                class: { done: this.moves[i] === this.solution[i] }
              }, move)
            )
        ]));
    }

    canAppend = () =>
        this.moves.length > this.solution.length &&
        this.moves.slice(0, this.solution.length).join(' ') === this.solution.join(' ');

    canForward = () =>
        this.moves.length < this.solution.length &&
        this.moves.join(' ') == this.solution.slice(0, this.moves.length).join(' ');

    isComplete = () =>
        this.moves.join(' ') == this.solution.join(' ');

    isInVariation = () => !this.isComplete() && !this.canForward();

    skip() {
        window.location.assign(`${this.home}/skip?skipped=${this._id}`);
    }

    append() {
        this.solution = [...this.moves];
        this.solutionSan = [...this.movesSan];

        const rewindEl = document.querySelector('.prev') as HTMLInputElement;
        rewindEl.classList.toggle('variation', false);

        this.updateSolution();
    }

    doSendMove(orig: cg.Orig, dest: cg.Key, promo: string) {
        console.log(orig, dest, promo);
        const move = cg2uci(orig + dest + promo) as UCIMove;
        this.moves.push(move);

        const san = this.ffishBoard.sanMove(move, this.notationAsObject);
        this.movesSan.push(san);

        this.ffishBoard.push(move);
        this.updateGui(move);
    }

    rewind() {
        if (this.moves.length === 0) return;

        this.moves.pop();
        this.movesSan.pop();
        this.ffishBoard.pop();
        const move = this.moves[this.moves.length - 1];
        this.updateGui(move);
    }

    forward() {
        const move = this.solution[this.moves.length];
        if (move) {
            this.doSendMove(move.slice(0, 2) as cg.Orig, move.slice(2, 4) as cg.Key, move.slice(4, 5));
        }
    }

    review(approved: boolean) {
        const elApprove = document.querySelector('.approve') as HTMLInputElement;
        const elReject = document.querySelector('.reject') as HTMLInputElement;
        console.log('approved:', approved);
        if (approved) {
            elApprove.classList.toggle('active', true);
            elReject.classList.toggle('active', false);
        } else {
            elApprove.classList.toggle('active', false);
            elReject.classList.toggle('active', true);
        }
        console.log('review', approved);
        window.location.assign(`${this.home}/review/${this._id}?approved=${approved ? 1 : 0}`);
    }

    private cgConfig = (move: UCIMove) => {
        const fen = this.ffishBoard.fen(this.variant.showPromoted, 0);
        const turnColor = fen.split(" ")[1] === "w" ? "white" : "black" as cg.Color;
        return {
            fen: fen,
            turnColor: turnColor,
            movable: {
                color: turnColor,
            },
            check: this.ffishBoard.isCheck(),
            lastMove: uci2LastMove(move)
        }
    }

    readFile() {
        const fileEl = document.getElementById('puzzlefile') as HTMLInputElement;
        const files = fileEl.files;
        if (files) {
            const username = this.username;
            const fileReader = new FileReader();
            fileReader.readAsText(files[0]);

            fileReader.onload = function() {
                if (fileReader.result) {
                    const allLines = (fileReader.result as string).split('\n');
                    //const mateWithMissingFullMoves: string[] = [];
                    allLines.forEach((line: string) => {
                        if (line.trim()) {
                            const parts = line.trim().split(';');
                            const ops = Object.fromEntries(parts.slice(1).map(s => s.split(' ')));
                            //if (ops.eval.startsWith('#') && ops.pv.split(',').length !== parseInt(ops.eval.slice(1)) * 2 - 1) {
                            //    mateWithMissingFullMoves.push(`${parts[0]} moves: ${ops.pv}`);
                            //} else {
                                const puzzle: Puzzle = {
                                    _id: randomId(),
                                    fen: parts[0],
                                    variant: ops.variant,
                                    moves: ops.pv,
                                    eval: ops.eval,
                                    type: ops.type,
                                    uploadedBy: username,
                                };
                                if (ops.site) {
                                    if (ops.site.includes('pychess')) {
                                        puzzle.gameId = ops.site.slice(-8);
                                    } else {
                                        puzzle.site = ops.site;
                                    }
                                }
                                postPuzzle(puzzle);
                            //}
                        }
                    });
                    //if (mateWithMissingFullMoves.length > 0) alert(`Missing mate sequence in FEN:\n${mateWithMissingFullMoves.join('\n')}`);
                }
            }
            fileReader.onerror = function() {
                alert(fileReader.error);
            }
        }
    }
}

function postPuzzle(puzzle: Puzzle) {
    const XHR = new XMLHttpRequest();
    const FD  = new FormData();
    Object.entries(puzzle).forEach(entry => {
        FD.append(entry[0], entry[1]);
    });
    XHR.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);
            if (response['error'] !== undefined) {
                console.log(response['error']);
            }
        }
    }
    XHR.open("POST", "/puzzle", true);
    XHR.send(FD);
}
