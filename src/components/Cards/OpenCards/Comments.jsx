import React, { useState, useEffect } from 'react';
import './scrollbar.css';
import { FaReply } from 'react-icons/fa';

const BEARER_TOKEN = '9e6dffc9-8b8c-43d7-bd5a-d84d84a95aa1';

function Comment({ comment, onReply, activeReplyId, onSubmitReply }) {

  
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = () => {
    if (!replyText.trim()) return;
    onSubmitReply(comment.id, replyText);
    setReplyText('');
  };

  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        <img 
          src={comment.author_avatar} 
          alt={`${comment.author_nickname}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-[FiraGO] text-[18px] font-medium text-[#212529] ">
            {comment.author_nickname}
          </h3>
          <p className="font-[FiraGO] text-[16px] font-custom-350 text-[#343A40] max-w-[580px] whitespace-pre-wrap break-words">
            {comment.text}
          </p>
          {!comment.is_reply && (
            <div>
              <button 
                onClick={() => onReply(comment.id)}
                className="mt-2 flex items-center gap-2 text-[#8338EC] hover:text-[#B588F4] font-[FiraGO] text-[14px]"
              >
                <FaReply className="text-[12px] font-normal font-[FiraGO] text-[#8338EC]" />
                უპასუხე
              </button>
              {activeReplyId === comment.id && (
                <div className="mt-4 relative w-full rounded-[10px] border border-[#ADB5BD] bg-white focus-within:ring-1 focus-within:ring-[#8338EC]">
                  <textarea
                    placeholder="დაწერე კომენტარი..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full min-h-[100px] px-[20px] pb-[60px] pt-[18px] rounded-t-[10px] focus:outline-none resize-none overflow-y-auto custom-scrollbar"
                  />
                  <div className="absolute bottom-[5px] w-full h-[40px] flex items-center justify-end bg-white rounded-b-[10px] border-t-0 px-[20px]">
                    <button 
                      onClick={handleSubmitReply}
                      disabled={!replyText.trim()}
                      className="px-3 py-1 w-[155px] h-[35px] rounded-[20px] text-white bg-[#8338EC] hover:bg-[#B588F4] disabled:bg-gray-400 disabled:cursor-not-allowed text-[16px] font-[FiraGO] leading-[100%] font-normal"
                    >
                      დააკომენტარე
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {comment.sub_comments && comment.sub_comments.length > 0 && (
        <div className="ml-[45px] mt-4">
          {[...comment.sub_comments]
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .map(reply => (
            <div key={reply.id} className="flex items-start gap-3 mb-4">
              <img 
                src={reply.author_avatar} 
                alt={`${reply.author_nickname}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-[FiraGO] text-[18px] font-medium text-[#212529]">
                  {reply.author_nickname}
                </h3>
                <p className="font-[FiraGO] text-[16px] font-custom-350 text-[#343A40] whitespace-pre-wrap break-words">
                  {reply.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Comments({ id }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    if (id) {
      fetchComments();
    }
  }, [id]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}/comments`, {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const data = await response.json();
      
      const sortedComments = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setComments(sortedComments);
      
      const total = sortedComments.reduce((acc, comment) => {
        return acc + 1 + (comment.sub_comments?.length || 0);
      }, 0);
      setTotalComments(total);
      
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ 
          text: newComment,
          parent_id: null
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post comment');
      }

      const newCommentData = await response.json();
      
      setComments(prevComments => [newCommentData, ...prevComments]);
      setTotalComments(prev => prev + 1);
      setNewComment('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReply = (commentId) => {
    setActiveReplyId(activeReplyId === commentId ? null : commentId);
  };

  const handleSubmitReply = async (parentId, replyText) => {
    if (!replyText.trim()) return;

    try {
      const response = await fetch(`https://momentum.redberryinternship.ge/api/tasks/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${BEARER_TOKEN}`,
        },
        body: JSON.stringify({ 
          text: replyText,
          parent_id: parentId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to post reply');
      }

      const newReplyData = await response.json();
      
      setComments(prevComments => prevComments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            sub_comments: [newReplyData, ...(comment.sub_comments || [])]
          };
        }
        return comment;
      }));
      setTotalComments(prev => prev + 1);
      setActiveReplyId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="w-[741px] h-[975px] top-[199px] left-[1059px] rounded-[10px] border-[0.3px] border-[#DDD2FF] bg-[#F8F3FEA6] absolute">
      <div className="relative w-[651px] mt-[40px] ml-[45px] rounded-[10px] border border-[#ADB5BD] bg-white focus-within:ring-1 focus-within:ring-[#8338EC]">
        <textarea
          placeholder="დაწერე კომენტარი..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full min-h-[100px] px-[20px] pb-[60px] pt-[18px] rounded-t-[10px] focus:outline-none resize-none overflow-y-auto custom-scrollbar"
        />
        <div className="absolute bottom-[5px] w-full h-[40px] flex items-center justify-end bg-white rounded-b-[10px] border-t-0 px-[20px]">
          <button 
            onClick={handleSubmitComment}
            disabled={!newComment.trim()}
            className="px-3 py-1 w-[155px] h-[35px] rounded-[20px] text-white bg-[#8338EC] hover:bg-[#B588F4] disabled:bg-gray-400 disabled:cursor-not-allowed text-[16px] font-[FiraGO] leading-[100%] font-normal"
          >
            დააკომენტარე
          </button>
        </div>
      </div>

      <div className="w-[172px] h-[24px] mt-[66px] ml-[45px] flex gap-[7px] items-center">
        <p className="font-[FiraGO] font-medium text-[20px] text-black">კომენტარები</p>
        <p className="bg-[#8338EC] font-[FiraGO] font-medium text-[14px] w-[30px] h-[22px] p-[10px] flex items-center justify-center gap-[10px] rounded-[30px] text-white">
          {totalComments}
        </p>
      </div>

      <div className="mt-6 ml-[45px] w-[651px] max-h-[650px] overflow-y-auto custom-scrollbar">
        {loading ? (
          <p className="text-center text-gray-500">Loading comments...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-gray-500">No comments yet</p>
        ) : (
          comments.map(comment => (
            <Comment 
              key={comment.id} 
              comment={comment} 
              onReply={handleReply}
              activeReplyId={activeReplyId}
              onSubmitReply={handleSubmitReply}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Comments;
