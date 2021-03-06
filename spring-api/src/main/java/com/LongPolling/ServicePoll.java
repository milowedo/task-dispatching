package com.LongPolling;

import org.jetbrains.annotations.Nullable;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public abstract class ServicePoll implements ServiceInterface {

    @Nullable
    private Resolvable newDataForResponse = null;

    @Transactional
    public Optional<Resolvable> resolve() {
        if (newDataForResponse == null) {
            return Optional.empty();
        } else {
            ServicePoll thisObj = this;
            new java.util.Timer().schedule(
                    new java.util.TimerTask() {
                        @Override
                        public void run() {
                            thisObj.newDataForResponse = null;
                        }
                    },
                    400
            );
            return Optional.of(newDataForResponse);
        }
    }

    @Override
    public void notifyOfChange(Resolvable resolvable) {
        newDataForResponse = resolvable;
    }
}
