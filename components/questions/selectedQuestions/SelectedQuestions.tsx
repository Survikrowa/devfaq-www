import { connect } from 'react-redux';
import React from 'react';
import { AppState } from '../../../redux/reducers/index';
import {
  getAreAnyQuestionSelected,
  getSelectedQuestionsIds,
  getSelectedQuestionsWithCategories,
} from '../../../redux/selectors/selectors';
import QuestionsList from '../questionsList/QuestionsList';
import NoQuestionsSelectedInfo from './NoQuestionsSelectedInfo';
import './selectedQuestions.scss';
import { Question } from '../../../redux/reducers/questions';
import { TechnologyKey, technologyIconItems } from '../../../constants/technology-icon-items';
import { ActionCreators } from '../../../redux/actions';
import { TransitionGroup } from 'react-transition-group';
import { AnimateHeight } from '../../animateProperty/AnimateProperty';
import { isEqual } from 'lodash';

type SelectedQuestionsProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;
class SelectedQuestionsComponent extends React.Component<SelectedQuestionsProps> {
  shouldComponentUpdate(nextProps: Readonly<SelectedQuestionsProps>): boolean {
    return !isEqual(this.props, nextProps);
  }

  render() {
    if (this.props.areAnyQuestionSelected) {
      return (
        <TransitionGroup
          appear={false}
          enter={false}
          className="selected-questions-container"
          component="div"
        >
          {this.renderSelectedQuestionsList()}
        </TransitionGroup>
      );
    } else {
      return <NoQuestionsSelectedInfo />;
    }
  }

  renderSelectedQuestionsList() {
    return this.props.selectedQuestionsWithCategories.map(([category, questions]) => {
      return this.renderSelectedQuestionsCategory(category, questions);
    });
  }

  renderSelectedQuestionsCategory(category: TechnologyKey, questions: Question[]) {
    const icon = technologyIconItems.find(i => i.name === category)!;

    return (
      <AnimateHeight enterTime={700} exitTime={700} key={category}>
        <section className="selected-questions--category">
          <div className="selected-questions--list-container">
            <div className="technology-icon-container">
              <span className="technology-icon-label">{icon.label}</span>
              <span className={icon.icon} />
            </div>
            <QuestionsList
              selectedQuestionIds={this.props.selectedQuestionIds}
              questions={{ isLoading: false, data: { data: questions } }}
              selectable={false}
              unselectable={true}
              toggleQuestion={this.toggleQuestion}
            />
          </div>
        </section>
      </AnimateHeight>
    );
  }

  toggleQuestion = (questionId: Question['id']) => {
    this.props.deselectQuestion(questionId);
  };
}

const mapStateToProps = (state: AppState) => {
  return {
    selectedQuestionsWithCategories: getSelectedQuestionsWithCategories(state),
    selectedQuestionIds: getSelectedQuestionsIds(state),
    areAnyQuestionSelected: getAreAnyQuestionSelected(state),
  };
};

const mapDispatchToProps = { deselectQuestion: ActionCreators.deselectQuestion };

const SelectedQuestions = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedQuestionsComponent);
export default SelectedQuestions;
