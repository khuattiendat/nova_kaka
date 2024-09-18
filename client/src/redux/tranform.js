import { createTransform } from 'redux-persist';

const SetTransform = createTransform(
    // transform state on its way to being serialized and persisted
    (inboundState, key) => {
        if (inboundState.mySet && inboundState.mySet instanceof Set) {
            return {
                ...inboundState,
                mySet: Array.from(inboundState.mySet),
            };
        }
        if (inboundState.socketConnection) {
            return {
                ...inboundState,
                socketConnection: null, // or any other serializable representation
            };
        }
        return inboundState;
    },
    // transform state being rehydrated
    (outboundState, key) => {
        if (outboundState.mySet && Array.isArray(outboundState.mySet)) {
            return {
                ...outboundState,
                mySet: new Set(outboundState.mySet),
            };
        }
        if (outboundState.socketConnection) {
            return {
                ...outboundState,
                socketConnection: null, // or any other deserialization logic
            };
        }
        return outboundState;
    },
    // define which reducers this transform gets called for.
    { whitelist: ['user'] }
);

export default SetTransform;