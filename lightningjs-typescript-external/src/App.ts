/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2022 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Lightning, Utils } from "@lightningjs/sdk";
import { getSharedString } from "@shared/utils";

interface IAppTemplateSpec extends Lightning.Component.TemplateSpec {
    Background: {
        Logo: object;
        Mystery: object;
        Text: object;
    };
}

export class App
    extends Lightning.Component<IAppTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<IAppTemplateSpec>
{
    static override _template(): Lightning.Component.Template<IAppTemplateSpec> {
        return {
            w: 1920,
            h: 1080,
            Background: {
                w: 1920,
                h: 1080,
                color: 0xfffbb03b,
                src: Utils.asset("images/background.png"),
                Logo: {
                    mountX: 0.5,
                    mountY: 1,
                    x: 960,
                    y: 600,
                    src: Utils.asset("images/logo.png"),
                },
                Mystery: {
                    x: 930,
                    y: 400,
                    w: 150,
                    h: 150,
                    scale: 0,
                    src: Utils.asset("images/mystery.png"),
                },
                Text: {
                    mount: 0.5,
                    x: 960,
                    y: 720,
                    text: {
                        text: "Let's start Building!",
                        fontFace: "Regular",
                        fontSize: 64,
                        textColor: 0xbbffffff,
                    },
                },
            },
        };
    }

    static getFonts(): Array<{
        family: string;
        url: string;
    }> {
        return [
            {
                family: "Regular",
                url: Utils.asset("fonts/Roboto-Regular.ttf") as string,
            },
        ];
    }

    /*
     * The following properties exist to make it more convenient to access elements
     * below in a type-safe way. They are optional.
     *
     * See https://lightningjs.io/docs/#/lightning-core-reference/TypeScript/Components/TemplateSpecs?id=using-a-template-spec
     * for more information.
     */
    readonly Background = this.getByRef("Background")!;
    readonly Logo = this.Background.getByRef("Logo")!;
    readonly Text = this.Background.getByRef("Text")!;
    readonly Mystery = this.Background.getByRef("Mystery")!;

    override _handleEnter(): void {
        this.Logo.setSmooth("scale", 2, {
            duration: 2.5,
        });
        this.Text.setSmooth("y", 800, {
            duration: 2.5,
        });
        this.Text.setSmooth("alpha", 0, {
            duration: 2.5,
            timingFunction: "ease-out",
        });
        this.Mystery.smooth = {
            x: 1025,
            y: 550,
            scale: 1,
        };
    }

    override _init(): void {
        const shared = getSharedString();
        console.log(shared);

        this.stage.transitions.defaultTransitionSettings.duration = 3;
        this.Background.animation({
            duration: 15,
            repeat: -1,
            delay: 1,
            actions: [
                {
                    p: "color",
                    v: {
                        0: { v: 0xfffbb03b },
                        0.5: { v: 0xfff46730 },
                        0.8: { v: 0xfffbb03b },
                    },
                },
            ],
        }).start();
    }
}
