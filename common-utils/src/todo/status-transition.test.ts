import {canMoveToStatus} from './status-transition';
import {TodoStatus} from '../../../types';

describe('Status Transition', () => {
  it('should allow correct transitions', () => {
    const transitions = [
      [TodoStatus.TODO, TodoStatus.ONGOING],
      [TodoStatus.ONGOING, TodoStatus.TODO],
      [TodoStatus.ONGOING, TodoStatus.DONE],
      [TodoStatus.DONE, TodoStatus.ONGOING],
    ];
    transitions.forEach(([from, to]) => {
      expect(canMoveToStatus(from, to)).toBe(true);
    });
  });

  it('should not allow invalid transitions', () => {
    const transitions = [
      [TodoStatus.TODO, TodoStatus.DONE],
      [TodoStatus.DONE, TodoStatus.TODO],
    ];
    transitions.forEach(([from, to]) => {
      expect(canMoveToStatus(from, to)).toBe(false);
    });
  });

  it('should allow noop transitions', () => {
    const transitions = [TodoStatus.TODO, TodoStatus.ONGOING, TodoStatus.DONE];
    transitions.forEach((status) => {
      expect(canMoveToStatus(status, status)).toBe(true);
    });
  });
});
