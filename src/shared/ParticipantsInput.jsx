import React, { useState, useRef } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
// import { X } from 'lucide-react';
import {Cross1Icon} from '@radix-ui/react-icons'
import { cn } from '@/lib/utils';

const ParticpantsCombobox = React.forwardRef((props, ref) => {
    const { tags, setTags } = props;

    const placeholder = 'enter participants email';
    // const [tags, setTags] = useState([]);
    const className=''

    const [inputErrMsg, setInputErrMsg] = useState(null)

    

    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !tags.includes(newTag)) {
                if (newTag.match( /.+\@.+\..+/) ) {
                    setTags([...tags, newTag]);

                }
                else {
                    setInputErrMsg('Please Enter a Mail address');
                    setTimeout(()=> {
                        setInputErrMsg(null)
                    },1000)
                }
            }
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className='border my-3'>
            <div className={`flex flex-wrap gap-2 rounded-md ${tags.length !== 0 && 'mb-3'}`}>
                {tags.map((tag, index) => (
                    <span key={index} className="transition-all border bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-8 items-center text-sm pl-2 rounded-md">
                        {tag}
                        <Button
                            type="button" 
                            variant="ghost"
                            onClick={() => removeTag(tag)}
                            className={cn("py-1 px-3 h-full hover:bg-transparent")}
                        >
                            {/* <X size={14} /> */}
                            <Cross1Icon  />
                        </Button>
                    </span>
                ))}
            </div>
            <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={className}
            />
            <span> {inputErrMsg} </span>
        </div>
    );
});

ParticpantsCombobox.displayName = 'TagInput';

export { ParticpantsCombobox };
