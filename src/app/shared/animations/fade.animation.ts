import { trigger, animate, transition, style } from '@angular/animations';

export const fadeAnimation =
    trigger('fadeAnimation', [
        transition(':leave', [
            style({opacity: 1}),
            animate('400ms cubic-bezier(.25,.8,.25,1)', style({opacity: 0}))
        ]),
        transition(':enter', [
            style({opacity: 0}),
            animate('400ms cubic-bezier(.25,.8,.25,1)', style({opacity: 1}))
        ])
    ]);
