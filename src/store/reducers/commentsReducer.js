const initialState = {
  post: {
    author: null,
    created_utc: null,
    id: null,
    name: null,
    score: null,
    title: null,
    selftext: null
  },
  error: null,
  comments: null,
  originalComment: null
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COMMENTS":
      const commentMap = {};
      const copyAction = action.post.comments;

      // move all the comments into a map of id => comment
      copyAction.forEach(comment => {
        commentMap[comment.id] = comment;
        commentMap[comment.id].children = [];

        return commentMap;
      });

      // iterate over the comments again and correctly nest the children
      copyAction.forEach(comment => {
        if (comment.parent_id !== undefined) {
          const parent = commentMap[comment.parent_id];
          parent.children.push(comment);
        }
      });

      copyAction.forEach(comment => {
        if (comment.parent_id !== undefined) {
          const id = comment.id;
          delete commentMap[id];
        }
      });

      return {
        ...state,
        comments: commentMap,
        originalComment: action.post.comments
      };

    case "SET_POST":
      return {
        ...state,
        post: {
          author: action.post.subreddit_name_prefixed,
          created_utc: action.post.created_utc,
          id: action.post.id,
          name: action.post.name,
          score: action.post.score,
          title: action.post.title,
          selftext: action.post.selftext
        }
      };

    case "FAIL_COMMENTS":
      return {
        ...state,
        error: action.error
      };

    case "ADD_COMMENTS":
      const copyOrginal = [...state.originalComment];
      copyOrginal.push(action.comments);

      const addcommentMap = {};

      // move all the comments into a map of id => comment
      copyOrginal.forEach(comment => {
        addcommentMap[comment.id] = comment;
        delete addcommentMap[comment.id].children;
        addcommentMap[comment.id].children = [];

        return commentMap;
      });

      // iterate over the comments again and correctly nest the children
      copyOrginal.forEach(comment => {
        if (comment.parent_id !== undefined) {
          const parent = addcommentMap[comment.parent_id];
          parent.children.push(comment);
        }
      });

      copyOrginal.forEach(comment => {
        if (comment.parent_id !== undefined) {
          const id = comment.id;
          delete addcommentMap[id];
        }
      });

      return {
        ...state,
        comments: addcommentMap,
        originalComment: copyOrginal
      };
    default:
      return state;
  }
};

export default commentsReducer;
