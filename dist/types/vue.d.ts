import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PublicProps } from 'vue';

export declare const BytedeskVue: DefineComponent<ExtractPropTypes<    {
    placement: {
        type: StringConstructor;
        required: true;
        validator: (value: string) => boolean;
    };
    onInit: {
        type: FunctionConstructor;
        default: null;
    };
}>, () => null, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
    placement: {
        type: StringConstructor;
        required: true;
        validator: (value: string) => boolean;
    };
    onInit: {
        type: FunctionConstructor;
        default: null;
    };
}>> & Readonly<{}>, {
    onInit: Function;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export { }
