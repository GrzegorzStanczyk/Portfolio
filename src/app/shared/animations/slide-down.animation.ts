import { trigger, state, animate, query, group, transition, style, keyframes } from '@angular/animations';

export const slideDownAnimation =
    trigger('slideDownAnimation', [
        transition('* <=> *', [
            query('.project', [
                animate('.8s ease-in-out', keyframes([
                    style({ transform: 'translateY(0)', opacity: 1, offset: 0}),
                    style({ transform: 'translateY(100%)', opacity: 0, offset: 0.1}),
                    style({ transform: 'translateY(0)', opacity: 0, offset: 0.15}),
                    style({ transform: 'translateY(0)', opacity: 1, offset: 1})
                ]))
            ], { optional: true }),
        ])
    ]);
