import * as $ from 'jquery'
import MoveTo from 'moveto'

export function moveRejected (elementId: string) {

    let $element = $(`#${elementId}`);

    animate(function (timePassed) {
        $element.offset({ left: timePassed / 5 } as any)
    }, 102 * 5)

}

function animate(draw: (timePassed: number) => void, duration: number) {
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        // определить, сколько прошло времени с начала анимации
        var timePassed = time - start;

        // возможно небольшое превышение времени, в этом случае зафиксировать конец
        if (timePassed > duration) timePassed = duration;

        // нарисовать состояние анимации в момент timePassed
        draw(timePassed);

        // если время анимации не закончилось - запланировать ещё кадр
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }

    });
}