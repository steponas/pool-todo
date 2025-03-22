import {TodoStatus} from '../../../types';

/**
 * Validate whether the TODO can transition from existing to the desired status.
 */
export const canMoveToStatus = (fromStatus: TodoStatus, toStatus: TodoStatus) => {
  if (fromStatus === toStatus) {
    return true;
  }
  switch (fromStatus) {
    case TodoStatus.TODO:
      return toStatus === 'ongoing';
    case 'ongoing':
      // Going to TODO and DONE is allowed.
      return true;
    case 'done':
      return toStatus === TodoStatus.ONGOING;
    default:
      return false;
  }
}
