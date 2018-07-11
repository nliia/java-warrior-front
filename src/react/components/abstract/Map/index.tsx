import * as React from 'react'
import b_ from "../../../../utils/BEM"
import * as _ from 'lodash'

import Animations from './animations'

import './styles.scss'

import * as $ from 'jquery'
import {Action, ActionType} from "../../../../api/CompilingApi";
import Animation from "../Animation";
import {time} from "core-decorators";

interface Props {
    scheme: MapScheme[]
    actions: Action[]
    onAllAnimationEnd: (value: boolean) => void
}

interface State {
    heroAnimation: AnimationConfig
    enemyAnimation: AnimationConfig
    heroAnimationIsActive: boolean
    actionsEnded: number
}

export enum MapScheme {
    hero,
    enemy,
    empty,
    thorns
}

interface AnimationConfig {
    frames: string[]
    config?: {
        imgStyle?: React.CSSProperties
        onEnd?: () => void
        repeatEvery?: number
        id: string
        lastEmpty?: boolean
    }
}

let map_ = b_('game-map')

export default class Map extends React.Component<Props, State> {

    state = {
        heroAnimation: {
            frames: this.getHeroAnimation('STATIC'),
            config: {
                imgStyle: {
                    width: '120%'
                },
                repeatEvery: 600,
                id: 'hero',
                lastEmpty: false
            }
        },
        enemyAnimation: {
            frames: this.getEnemyAnimation('STATIC'),
            config: {
                imgStyle: {
                    width: '145%',
                    marginLeft: -20
                },
                id: 'enemy',
                repeatEvery: 5000,
                lastEmpty: false
            }
        },
        heroAnimationIsActive: false,
        actionsEnded: 0
    }

    getTag (entity: MapScheme) {
        return MapScheme[entity];
    }

    getHeroAnimation (animation: ActionType) {
        switch (animation) {
            case "DEATH":
                return Animations.Hero.Death;
            case "MOVE_FORWARD":
                return Animations.Hero.Walk;
            case "TAKING_DAMAGE":
                return Animations.Hero.TakingDamage;
            case "STATIC":
                return Animations.Hero.Idle;
            case "FLIP_FORWARD":
                return Animations.Hero.Jump;
            case "SHOOT":
                return Animations.Hero.Attack;
        }
    }

    getEnemyAnimation (animation: ActionType) {
        switch (animation) {
            case "DEATH":
                return Animations.Enemy.Death;
            case "STATIC":
                return Animations.Enemy.Idle;
        }
    }

    wrapImage (entity: MapScheme, index: number) {
        return (
            <div id={entity == MapScheme.hero ? "hero" : undefined} key={index} className={map_({
                elem: 'field',
                mods: {
                    [this.getTag(entity)]: true,
                }
            })}></div>
        )
    }

    wrapToAnimation (config: AnimationConfig) {
        return (
            <Animation
                src={config.frames}
                width={102}
                height={135}
                id={config.config.id}
                lastEmpty={config.config.lastEmpty}
                repeatEvery={config.config.repeatEvery || 0}
                imgStyle={config.config.imgStyle}
            />
        );
    }

    getWrappedAnimation (method: (action?: Action) => any, duration: number) : WrappedAnimation {
        return {
            method,
            duration
        }
    }

    getAnimation (action: ActionType) : WrappedAnimation {
        switch (action) {
            case "MOVE_FORWARD":
                return this.getWrappedAnimation(this.moveForward, 102 * 5 * 3);
            case "MOVE_FORWARD_REJECTED":
                return this.getWrappedAnimation(this.moveForwardRejected, 102 * 5 * 2 + 1000);
            case "DEATH":
                return this.getWrappedAnimation(this.death, 3000);
            case "FLIP_FORWARD":
                return this.getWrappedAnimation(this.flipForward, 102 * 5 * 3 + 300);
            case "FLIP_FORWARD_REJECTED":
                return  this.getWrappedAnimation(this.flipForwardRejected, 102 * 5 * 3 + 500);
            case "SHOOT":
                return this.getWrappedAnimation(this.shoot, 3300 + 1000)
        }
    }

    runAnimations (action_index: number, actions: Action[]) {
        console.log('set', action_index, actions.length - 2, actions);
        let wrappedAnimation = this.getAnimation(actions[action_index].actionEnum);
        console.log(wrappedAnimation);
        wrappedAnimation.method(actions[action_index]);
        if (action_index <= actions.length - 2) {
            setTimeout(() => {
                this.runAnimations(action_index+1, actions);
            }, wrappedAnimation.duration)
        }
    }

    isHeroAnimation (action: ActionType) {
        return _.isEqual(this.state.heroAnimation, this.getHeroAnimation(action));
    }

    isEnemyAnimation (action: ActionType) {
        return _.isEqual(this.state.enemyAnimation, this.getEnemyAnimation(action));
    }

    // animations
    moveForward = () => {
        let $element = $(`#hero`),
            duration = 102 * 5,
            { heroAnimation } = this.state;

        heroAnimation.frames = this.getHeroAnimation('MOVE_FORWARD');
        heroAnimation.config.repeatEvery = 700;
        this.setState({ heroAnimation });

        this.animate((timePassed) => {
            let left = Math.round(+$element.css('left').replace('px', '') | 0);
            $element.css({left: left + 1.95});
            if (timePassed == duration * 3) {
                heroAnimation.frames = this.getHeroAnimation('STATIC');
                heroAnimation.config.repeatEvery = 600;
                this.setState({ heroAnimation })
            }
        }, duration * 3);
    }

    moveForwardRejected = () => {

        let $element = $(`#hero`),
            duration = 102 * 5,
            { heroAnimation } = this.state;

        heroAnimation.frames = this.getHeroAnimation('MOVE_FORWARD');

        this.setState({ heroAnimation });
        let oldLeft = 0;
        this.animate((timePassed) => {
            let left = Math.round(+$element.css('left').replace('px', '') | 0);
            let top = Math.round(+$element.css('top').replace('px', '') | 0);
            if (timePassed == duration * 2) {
                if (!this.isHeroAnimation('TAKING_DAMAGE')) {
                    heroAnimation.frames = this.getHeroAnimation('TAKING_DAMAGE');
                    heroAnimation.config.repeatEvery = 0;
                    this.setState({ heroAnimation })
                }
            }
            if (timePassed > duration + 200) {
                $element.css({ left: left - 1.8 });
            } else if (timePassed < duration + 200)  {
                $element.css({left: left + 1.8});
                oldLeft = +$element.css('left').replace('px', '');
            }
        }, duration * 2);
    }

    death = () => {
        let { heroAnimation } = this.state;
        heroAnimation = {...heroAnimation};
        this.animate(timePassed => {
            if (!this.isHeroAnimation('DEATH')) {
                heroAnimation.frames = this.getHeroAnimation('DEATH');
                heroAnimation.config.repeatEvery = 0;
                heroAnimation.config.lastEmpty = true;
                this.setState({ heroAnimation });
            }
        }, 1400)
    }

    flipForward = () => {
        let $element = $(`#hero`),
            width = 102,
            dist = width * 5,
            duration = dist * 3,
            { heroAnimation } = this.state;

        heroAnimation.frames = this.getHeroAnimation('MOVE_FORWARD');

        this.setState({ heroAnimation });
        let oldBottom = 0;
        this.animate((timePassed) => {
            let left = Math.round(+$element.css('left').replace('px', '') | 0);
            let bottom = Math.round(+$element.css('bottom').replace('px', '') | 0);
            let startJump = timePassed > dist;
            console.log(timePassed);
            let spikesAbove = (left-width) <= 5;
            if (startJump) {
                if (oldBottom == 35) {
                    $element.css({ left: left + 2, bottom: bottom - 1 });
                } else if (bottom < 40) {
                    if (!this.isHeroAnimation('FLIP_FORWARD')) {
                        heroAnimation.frames = this.getHeroAnimation('FLIP_FORWARD');
                        heroAnimation.config.repeatEvery = 700;
                        this.setState({heroAnimation})
                    }
                    $element.css({ left: left + 2, bottom: bottom + 1 });
                } else {
                    oldBottom = 35;
                }
            } else {
                $element.css({ left: left + 1 });
            }
        }, duration + 300);
    }

    flipForwardRejected = () => {
        let $element = $(`#hero`),
            width = 102,
            dist = width * 5,
            duration = dist * 3,
            { heroAnimation } = this.state;

        heroAnimation.frames = this.getHeroAnimation('MOVE_FORWARD');

        this.setState({ heroAnimation });
        let oldBottom = 0;
        this.animate((timePassed) => {
            let left = Math.round(+$element.css('left').replace('px', '') | 0);
            let bottom = Math.round(+$element.css('bottom').replace('px', '') | 0);
            let startJump = timePassed > dist;
            console.log(timePassed);
            let spikesAbove = (left-width) <= 5;
            let taking_damage = duration - timePassed <= 500;
            if (startJump) {
                if (oldBottom == 35) {
                    if (bottom > 0) {
                        $element.css({ left: left - 1.05, bottom: bottom - 1 });
                    } else {
                        if (!this.isHeroAnimation('TAKING_DAMAGE')) {
                            heroAnimation.frames = this.getHeroAnimation('TAKING_DAMAGE');
                            heroAnimation.config.repeatEvery = 0;
                            this.setState({ heroAnimation })
                        }
                    }
                } else if (bottom < 40) {
                    if (!this.isHeroAnimation('FLIP_FORWARD')) {
                        heroAnimation.frames = this.getHeroAnimation('FLIP_FORWARD');
                        heroAnimation.config.repeatEvery = 700;
                        this.setState({heroAnimation})
                    }
                    $element.css({ left: left + 1, bottom: bottom + 1 });
                } else {
                    oldBottom = 35;
                }
            } else {
                $element.css({ left: left + 1 });
            }
        }, duration + 500);
    }

    shoot = (action: Action) => {
        let { heroAnimation, enemyAnimation } = this.state;
        heroAnimation = {...heroAnimation};
        this.animate(timePassed => {
            if (timePassed >= 3300) {
                if (!this.isHeroAnimation('STATIC')) {
                    heroAnimation.frames = this.getHeroAnimation('STATIC');
                    heroAnimation.config.repeatEvery = 0;
                    this.setState({ heroAnimation });
                }
                if (!this.isEnemyAnimation('DEATH')) {
                    enemyAnimation.frames = this.getEnemyAnimation('DEATH');
                    enemyAnimation.config.repeatEvery = 0;
                    enemyAnimation.config.lastEmpty = true;
                    this.setState({ enemyAnimation })
                }
            } else {
                if (!this.isHeroAnimation('SHOOT')) {
                    heroAnimation.frames = this.getHeroAnimation('SHOOT');
                    heroAnimation.config.repeatEvery = 0;
                    this.setState({ heroAnimation });
                }
            }
        }, 3300+1000)
    }

    // animations end

    animate = (draw: (timePassed: number) => void, duration: number, onEnd?: () => {}) => {
        var start = performance.now();
        let self = this;

        requestAnimationFrame(function animate(time) {
            // определить, сколько прошло времени с начала анимации
            let { actionsEnded } = self.state,
                timePassed = time - start;

            // возможно небольшое превышение времени, в этом случае зафиксировать конец
            if (timePassed > duration) timePassed = duration;

            if (duration == timePassed) {
                self.setState({ heroAnimationIsActive: false });
                if (actionsEnded+1 == self.props.actions.length) {
                    self.props.onAllAnimationEnd(true);
                }
                self.setState({ actionsEnded: actionsEnded+1 });
            } else {
                self.setState({ heroAnimationIsActive: true })
            }

            // нарисовать состояние анимации в момент timePassed
            draw(timePassed);

            // если время анимации не закончилось - запланировать ещё кадр
            if (timePassed < duration) {
                requestAnimationFrame(animate);
            }

        });
    }

    animateStatic (f: () => void) {
        f();
        let { actionsEnded } = this.state;
        this.setState({ actionsEnded: actionsEnded + 1 });
    }

    componentWillReceiveProps (nextProps: Props) {
        if (!_.isEqual(nextProps.actions, this.props.actions) && nextProps.actions.length) {
            this.runAnimations(0, nextProps.actions);
        }
    }

    render () {
        return (
            <div className={map_()}>
                <div className={map_({ elem: 'fields' })}>
                    {
                        this.props.scheme.map((ent, index) => {
                            if (ent == MapScheme.hero) {
                                return this.wrapToAnimation(this.state.heroAnimation)
                            } else if (ent == MapScheme.enemy) {
                                return this.wrapToAnimation(this.state.enemyAnimation)
                            } else return this.wrapImage(ent, index)
                        })
                    }
                </div>
            </div>
        )
    }


}

interface WrappedAnimation {
    method: (action?: Action) => any
    duration: number
}