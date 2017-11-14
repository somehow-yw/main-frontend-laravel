/*
* 排序;
* */

class Sort extends React.Component {
    constructor(props) {
        super(props);
    }

    //排序
    sortHandler(e) {
        let node = e.target,
            className = node.className,
            sort = parseInt(node.dataset.sort),
            param = this.props.defaultParam;
        switch (sort) {
            case 1:
                if(className.indexOf('active') == -1) {
                    param.order[0] = sort;
                }
                break;
            case 2:
                if(className.indexOf('active') == -1) {
                    param.order[0] = sort;
                }
                break;
            case 3:
                if(className.indexOf('active') == -1) {
                    param.order = [sort, false];
                }else {
                    param.order[1] = !param.order[1];
                }
                break;
            case 4:
                if(className.indexOf('active') == -1) {
                    param.order = [4, false];
                }
                break;
            case 100:
                this.props.show = 1;
                break;
        }

        //if(sort == 4) {
        //    this.props.show = 1;
        //}else {
        //    if(sort == 0) {    //点击默认排序;
        //        if(param.order[0] == sort) return;   //如果原来是默认排序，再次点默认排序则无效（默认排序只有一种：true）;
        //    }else {
        //        if(param.order[0] == sort) {
        //            param.order[1] = !param.order[1];
        //        }else {
        //            if(sort == 1 || sort == 2) {   //如果是好评度和销量，默认按从大到小;
        //                param.order[1] = false;
        //            }else {
        //                param.order[1] = true;
        //            }
        //        }
        //    }
        //    param.order[0] = sort;
        //
        //}
        this.props.sort && this.props.sort(sort);
    }

    render() {
        let param = this.props.defaultParam;
        return (
            <div className="banner sort-bar" data-operate="order" onClick={this.sortHandler.bind(this)}>
                <span className={param.order[0]==4 ? 'active' : null} data-sort="4">优选商品</span>
                {/*<span className={param.order[0]==0?'active':null} data-sort="0">默认排序</span>*/}
                <span className={param.order[0]==1 ? 'active' : null} data-sort="1">好评度</span>
                <span className={param.order[0]==2 ? 'active' : null} data-sort="2">销量</span>
                <span className={'sort-icon '+(param.order[0]==3?('active'+(!param.order[1]?' desc':' asc')):'')} data-sort="3">价格</span>
                <span data-sort="100">筛选</span>
            </div>
        );
    }
}

export default Sort;