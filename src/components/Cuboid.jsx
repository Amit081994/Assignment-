import React, { useRef, useState } from 'react'
import {
    Engine,
    Scene,
    useBeforeRender
} from 'react-babylonjs'
import { Vector3, Color3, Texture } from '@babylonjs/core'
import { useSelector } from 'react-redux'


const SpinningBox = (props) => {
    // access Babylon scene objects with same React hook as regular DOM elements
    const boxRef = useRef(null)
    // This will rotate the box on every Babylon frame.
    const rpm = 5
    useBeforeRender((scene) => {
        if (boxRef.current) {
            // Delta time smoothes the animation.
            var deltaTimeInMillis = scene.getEngine().getDeltaTime()
            boxRef.current.rotation.y +=
                (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000)
        }
    })

    return (
        <box
            name={props.name}
            ref={boxRef}
            size={2}
            width={3}
            position={props.position}
        >
            <standardMaterial
                name={`${props.name}-mat`}
                diffuseColor={props.color}
                diffuseTexture={props.txt}
            />
        </box>
    )
}

export const Cuboid = () => {
    const sc = useSelector((state) => {
        return state.users
    })
    const [texture, setTexture] = useState()
    const [clicked, setClicked] = useState(false)

    const setMapTexture = (() => {
        const map = new Texture(sc[0])
        setTexture(map)
        setClicked(true)
    })

    return (
        <>
            <div className='screenshot-container'>
                {
                    !clicked ?
                        <button onClick={setMapTexture} >
                            <h3> Wrap screenshot  on this cuboid</h3></button>
                        :
                        <button><h3>Wrapped ✌</h3> </button>
                }
                <img src={sc[0]} width={350} />

            </div>
            <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
                <Scene >
                    <arcRotateCamera
                        name="camera1"
                        target={Vector3.Zero()}
                        alpha={Math.PI / 2}
                        beta={Math.PI / 4}
                        radius={12}
                        lowerRadiusLimit={12}
                        upperRadiusLimit={5}
                    />
                    <hemisphericLight
                        name="light1"
                        intensity={1}
                        direction={Vector3.Up()}
                    />
                    <hemisphericLight
                        name="light1"
                        intensity={1}
                        direction={Vector3.Down()}
                    />
                    <pointLight
                        name="pointlight1"
                        intensity={0.7}
                        position={new Vector3(0, 5, 0)}

                    />

                    <SpinningBox
                        name="right"
                        position={new Vector3(0, 0, 0)}
                        color={Color3.FromHexString('#fffee6')}
                        txt={texture}
                    />
                </Scene>
            </Engine>

        </>
    )
}