import { trigger, state, animate, query, group, transition, style } from '@angular/animations';

export const slideLeftAnimation =
    trigger('slideLeftAnimation', [
        transition('* <=> *', [
            query(':enter, :leave', style({ position: 'fixed', width: '100%' })
            , { optional: true }),
            group([
                query(':enter', [
                    style({ transform: 'translateX(100%)'}),
                    // animate('.7s cubic-bezier(0.84, -0.22, 0.33, 1.25)', style({ transform: 'translateX(0%)' }))
                    animate('.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)', style({ transform: 'translateX(0%)' }))
                    // animate('.7s cubic-bezier(0.84, -0.22, 0.33, 1.25)', style({ transform: 'translateX(0%)' }))
                ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    // animate('.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)', style({ transform: 'translateX(-100%)' }))
                    animate('.7s cubic-bezier(0.68, -0.55, 0.265, 1.55)', style({ transform: 'translateX(-100%)' }))
                    // animate('.7s cubic-bezier(0.84, -0.22, 0.33, 1.25)', style({ transform: 'translateX(-100%)' }))
                ], { optional: true })
            ])
        ])
    ]);


export const slideBackgroundAnimation =
    trigger('slideBackgroundAnimation', [
        state('out', style({transform: 'translate3d(100%,0,0)'})),
        state('in', style({transform: 'translate3d(0,0,0)'})),
        transition('out => in', [
            animate('2s 450ms cubic-bezier(0.19, 1, 0.22, 1)')
          ]),
    ]);
