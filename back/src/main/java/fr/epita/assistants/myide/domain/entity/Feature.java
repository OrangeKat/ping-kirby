package fr.epita.assistants.myide.domain.entity;

import fr.epita.assistants.myide.utils.Given;
import lombok.AllArgsConstructor;

import javax.validation.constraints.NotNull;

@Given()
public interface Feature {

    /**
     * @param project {@link Project} on which the feature is executed.
     * @param params  Parameters given to the features.
     * @return {@link ExecutionReport}
     */
    @NotNull ExecutionReport execute(final Project project, final Object... params);

    /**
     * @return The type of the Feature.
     */
    @NotNull Type type();

    @AllArgsConstructor
    class SuccessReport {
        public String output;
        public boolean isSuccess;
    }

    @FunctionalInterface
    interface ExecutionReport {
        SuccessReport isSuccess();
    }

    interface Type {
    }
}
