import { trigger, state, style, transition, animate } from '@angular/animations';

export const toggleNavigation =
    trigger('toggleNavigation', [
        state('show', style({
            transform: 'translate3d(-50%, 0, 0)'
        })),
        state('hide', style({
            transform: 'translate3d(-50%, 250%, 0)'
        })),
        transition('* <=> *', animate('400ms cubic-bezier(.25,.8,.25,1)'))
    ]);
